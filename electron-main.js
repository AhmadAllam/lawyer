
let electron, app, BrowserWindow, Menu, ipcMain, shell, dialog;

try {
    if (process.versions.electron) {
        electron = require('electron');
        app = require('electron').app;
        BrowserWindow = require('electron').BrowserWindow;
        Menu = require('electron').Menu;
        ipcMain = require('electron').ipcMain;
        shell = require('electron').shell;
        dialog = require('electron').dialog;
    } else {

        process.exit(1);
    }
} catch (error) {

    process.exit(1);
}

const fs = require('fs');
const path = require('path');
const os = require('os');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true
        },
        title: 'Lawyers Egypt Digital',
        autoHideMenuBar: true
    });


    mainWindow.maximize();

    mainWindow.loadFile('index.html');
    
    mainWindow.on('close', async (e) => {
        try {
            e.preventDefault();
            const shouldBackup = await mainWindow.webContents.executeJavaScript(`(async () => {
                try {
                    const db = await new Promise((resolve, reject) => {
                        const req = indexedDB.open('LawyerAppDB');
                        req.onsuccess = () => resolve(req.result);
                        req.onerror = () => reject(req.error);
                    });
                    if (!db.objectStoreNames.contains('settings')) { try { db.close(); } catch(e) {} return false; }
                    const res = await new Promise((resolve) => {
                        try {
                            const tx = db.transaction(['settings'], 'readonly');
                            const store = tx.objectStore('settings');
                            const r = store.get('autoBackupOnExit');
                            r.onsuccess = () => {
                                const val = r.result ? r.result.value : null;
                                resolve(val === true || val === '1' || val === 1);
                            };
                            r.onerror = () => resolve(false);
                        } catch (err) {
                            resolve(false);
                        }
                    });
                    try { db.close(); } catch (e) {}
                    return res;
                } catch (err) {
                    return false;
                }
            })();`, true);
            let backupJson = null;
            if (shouldBackup) {
                backupJson = await mainWindow.webContents.executeJavaScript(`(async () => {
                    try {
                        const db = await new Promise((resolve, reject) => {
                            const req = indexedDB.open('LawyerAppDB');
                            req.onsuccess = () => resolve(req.result);
                            req.onerror = () => reject(req.error);
                        });
                        const storeNames = ['clients','opponents','cases','sessions','accounts','administrative','clerkPapers','expertSessions','settings'];
                        const data = {};
                        await Promise.all(storeNames.map(name => new Promise((resolve) => {
                            if (!db.objectStoreNames.contains(name)) {
                                data[name] = [];
                                return resolve();
                            }
                            try {
                                const tx = db.transaction([name], 'readonly');
                                const store = tx.objectStore(name);
                                const r = store.getAll();
                                r.onsuccess = () => { data[name] = r.result; resolve(); };
                                r.onerror = () => { data[name] = []; resolve(); };
                            } catch (err) {
                                data[name] = [];
                                resolve();
                            }
                        })));
                        try { db.close(); } catch (e) {}
                        const backup = { version: '1.0.0', timestamp: new Date().toISOString(), data };
                        return JSON.stringify(backup);
                    } catch (err) {
                        return null;
                    }
                })();`, true);
            }
            if (backupJson) {
                const appDir = app && app.isPackaged ? path.dirname(process.execPath) : process.cwd();
                const parentDir = path.dirname(appDir);
                const clientsFolder = path.join(parentDir, 'Clients Files');
                if (!fs.existsSync(clientsFolder)) {
                    fs.mkdirSync(clientsFolder, { recursive: true });
                }
                const dateStr = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                const filename = `lawyers-backup-${dateStr}.json`;
                fs.writeFileSync(path.join(clientsFolder, filename), backupJson, 'utf8');
            }
        } catch (err) {
        } finally {
            try { mainWindow.removeAllListeners('close'); } catch(e) {}
            try { mainWindow.destroy(); } catch(e) {}
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

if (app) {
    app.on('ready', () => {
        if (Menu) {
            Menu.setApplicationMenu(null);
        }
        createWindow();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });


    ipcMain.handle('create-client-folder', async (event, clientName) => {
        try {
            const appDir = app && app.isPackaged ? path.dirname(process.execPath) : process.cwd();
            const parentDir = path.dirname(appDir);
            const clientsFolder = path.join(parentDir, 'Clients Files');
            const clientFolder = path.join(clientsFolder, clientName);


            if (!fs.existsSync(clientsFolder)) {
                fs.mkdirSync(clientsFolder, { recursive: true });
            }


            if (!fs.existsSync(clientFolder)) {
                fs.mkdirSync(clientFolder, { recursive: true });
            }


            const result = await dialog.showOpenDialog(mainWindow, {
                title: 'اختيار الملفات لنسخها',
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: 'جميع الملفات', extensions: ['*'] },
                    { name: 'مستندات', extensions: ['pdf', 'doc', 'docx', 'txt'] },
                    { name: 'صور', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
                ]
            });

            if (!result.canceled && result.filePaths.length > 0) {

                for (const filePath of result.filePaths) {
                    const fileName = path.basename(filePath);
                    const destPath = path.join(clientFolder, fileName);
                    fs.copyFileSync(filePath, destPath);
                }
                return { success: true, message: `تم إنشاء المجلد ونسخ ${result.filePaths.length} ملف`, filesCount: result.filePaths.length };
            } else {
                return { success: true, message: 'تم إنشاء المجلد بنجاح', filesCount: 0 };
            }
        } catch (error) {

            return { success: false, message: 'حدث خطأ في إنشاء المجلد' };
        }
    });

    ipcMain.handle('open-client-folder', async (event, clientName) => {
        try {
            const appDir = app && app.isPackaged ? path.dirname(process.execPath) : process.cwd();
            const parentDir = path.dirname(appDir);
            const clientsFolder = path.join(parentDir, 'Clients Files');
            const clientFolder = path.join(clientsFolder, clientName);

            if (fs.existsSync(clientFolder)) {
                shell.openPath(clientFolder);
                return { success: true, message: 'تم فتح مجلد الموكل' };
            } else {
                return { success: false, message: 'مجلد الموكل غير موجود' };
            }
        } catch (error) {

            return { success: false, message: 'حدث خطأ في فتح المجلد' };
        }
    });


    ipcMain.handle('open-clients-main-folder', async (event) => {
        try {
            const appDir = app && app.isPackaged ? path.dirname(process.execPath) : process.cwd();
            const parentDir = path.dirname(appDir);
            const clientsFolder = path.join(parentDir, 'Clients Files');
            if (!fs.existsSync(clientsFolder)) {
                fs.mkdirSync(clientsFolder, { recursive: true });
            }
            shell.openPath(clientsFolder);
            return { success: true, message: 'تم فتح مجلد الموكلين' };
        } catch (error) {
            return { success: false, message: 'حدث خطأ في فتح مجلد الموكلين' };
        }
    });


    ipcMain.handle('create-directory', async (event, dirPath) => {
        try {
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                return { success: true, message: 'تم إنشاء المجلد بنجاح' };
            } else {
                return { success: false, error: 'EEXIST: المجلد موجود بالفعل' };
            }
        } catch (error) {

            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('open-folder', async (event, folderPath) => {
        try {
            if (fs.existsSync(folderPath)) {
                shell.openPath(folderPath);
                return { success: true, message: 'تم فتح المجلد' };
            } else {
                return { success: false, error: 'المجلد غير موجود' };
            }
        } catch (error) {

            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('read-directory', async (event, dirPath) => {
        try {
            if (!fs.existsSync(dirPath)) {
                return { success: false, error: 'المجلد غير موجود' };
            }

            const items = fs.readdirSync(dirPath, { withFileTypes: true });
            const result = items.map(item => ({
                name: item.name,
                isDirectory: item.isDirectory(),
                isFile: item.isFile()
            }));

            return { success: true, items: result };
        } catch (error) {

            return { success: false, error: error.message };
        }
    });


    ipcMain.handle('create-legal-library-folder', async (event, folderName) => {
        try {
            // التحقق من وجود اسم المجلد
            if (!folderName || folderName.trim() === '') {
                return { success: false, message: 'يرجى إدخال اسم المجلد' };
            }
            
            // تنظيف اسم المجلد من الأحرف غير المسموحة
            const cleanFolderName = folderName.trim().replace(/[<>:"/\\|?*]/g, '');
            
            if (!cleanFolderName) {
                return { success: false, message: 'اسم المجلد يحتوي على أحرف غير مسموحة فقط' };
            }

            const desktopPath = path.join(os.homedir(), 'Desktop');
            const libraryPath = path.join(desktopPath, 'المكتبة القانونية');
            const newFolderPath = path.join(libraryPath, cleanFolderName);

            // إنشاء مجلد المكتبة الرئيسي إذا لم يكن موجوداً
            if (!fs.existsSync(libraryPath)) {
                fs.mkdirSync(libraryPath, { recursive: true });
            }

            // إنشاء المجلد الجديد أو التأكد من وجوده
            if (!fs.existsSync(newFolderPath)) {
                fs.mkdirSync(newFolderPath, { recursive: true });
            }

            // إظهار نافذة اختيار الملفات
            const result = await dialog.showOpenDialog(mainWindow, {
                title: 'اختيار الملفات لإضافتها للمكتبة القانونية',
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: 'جميع الملفات', extensions: ['*'] }
                ],
                defaultPath: require('os').homedir()
            });

            if (!result.canceled && result.filePaths.length > 0) {
                // نسخ الملفات المختارة للمجلد
                for (const filePath of result.filePaths) {
                    const fileName = path.basename(filePath);
                    const destPath = path.join(newFolderPath, fileName);
                    fs.copyFileSync(filePath, destPath);
                }
                return { 
                    success: true, 
                    message: `تم إنشاء مجلد "${cleanFolderName}" وإضافة ${result.filePaths.length} ملف`, 
                    filesCount: result.filePaths.length,
                    folderName: cleanFolderName
                };
            } else {
                return { 
                    success: true, 
                    message: `تم إنشاء مجلد "${cleanFolderName}" بنجاح`, 
                    filesCount: 0,
                    folderName: cleanFolderName
                };
            }
        } catch (error) {

            return { success: false, message: 'حدث خطأ في إنشاء المجلد: ' + error.message };
        }
    });

    ipcMain.handle('open-legal-library-main-folder', async (event) => {
        try {
            const desktopPath = path.join(os.homedir(), 'Desktop');
            const libraryPath = path.join(desktopPath, 'المكتبة القانونية');
            
            // إنشاء المجلد إذا لم يكن موجوداً
            if (!fs.existsSync(libraryPath)) {
                fs.mkdirSync(libraryPath, { recursive: true });
            }

            shell.openPath(libraryPath);
            return { success: true, message: 'تم فتح مجلد المكتبة القانونية' };
        } catch (error) {

            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('load-legal-library-folders', async (event) => {
        try {
            const desktopPath = path.join(os.homedir(), 'Desktop');
            const libraryPath = path.join(desktopPath, 'المكتبة القانونية');
            
            // إنشاء مجلد المكتبة إذا لم يكن موجوداً
            if (!fs.existsSync(libraryPath)) {
                fs.mkdirSync(libraryPath, { recursive: true });
            }
            
            // المجلدات الافتراضية
            const defaultFolders = [
                'قانون المرافعات',
                'القانون المدنى',
                'القانون الجنائى',
                'القانون الادارى',
                'قانون الاجراءات الجنائية',
                'قانون العمل والتأمينات',
                'قانون الاحوال الشخصيه',
                'احكام محكمه النقض'
            ];
            
            // إنشاء المجلدات الافتراضية إذا لم تكن موجودة
            defaultFolders.forEach(folderName => {
                const folderPath = path.join(libraryPath, folderName);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }
            });

            const items = fs.readdirSync(libraryPath, { withFileTypes: true });
            const folders = items.filter(item => item.isDirectory()).map(item => ({
                name: item.name,
                isDirectory: true,
                isFile: false
            }))
            .sort((a, b) => {
                // ترتيب المجلدات الافتراضية أولاً
                const aIndex = defaultFolders.indexOf(a.name);
                const bIndex = defaultFolders.indexOf(b.name);
                
                if (aIndex !== -1 && bIndex !== -1) {
                    return aIndex - bIndex;
                } else if (aIndex !== -1) {
                    return -1;
                } else if (bIndex !== -1) {
                    return 1;
                } else {
                    return a.name.localeCompare(b.name, 'ar');
                }
            });

            return { success: true, items: folders };
        } catch (error) {

            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('open-legal-library-folder', async (event, folderName) => {
        try {
            const desktopPath = path.join(os.homedir(), 'Desktop');
            const libraryPath = path.join(desktopPath, 'المكتبة القانونية');
            const folderPath = path.join(libraryPath, folderName);
            
            if (fs.existsSync(folderPath)) {
                shell.openPath(folderPath);
                return { success: true, message: `تم فتح مجلد "${folderName}"` };
            } else {
                return { success: false, error: 'المجلد غير موجود' };
            }
        } catch (error) {

            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('delete-legal-library-folder', async (event, folderName) => {
        try {
            const desktopPath = path.join(os.homedir(), 'Desktop');
            const libraryPath = path.join(desktopPath, 'المكتبة القانونية');
            const folderPath = path.join(libraryPath, folderName);
            
            if (fs.existsSync(folderPath)) {
                // حذف المجلد وكل محتوياته
                fs.rmSync(folderPath, { recursive: true, force: true });
                return { success: true, message: `تم حذف مجلد "${folderName}" بنجاح` };
            } else {
                return { success: false, error: 'المجلد غير موجود' };
            }
        } catch (error) {

            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('rename-legal-library-folder', async (event, oldName, newName) => {
        try {
            // تنظيف الاسم الجديد
            const cleanNewName = newName.replace(/[<>:"/\\|?*]/g, '');
            
            if (!cleanNewName) {
                return { success: false, error: 'الاسم الجديد يحتوي على أحرف غير مسموحة' };
            }

            const desktopPath = path.join(os.homedir(), 'Desktop');
            const libraryPath = path.join(desktopPath, 'المكتبة القانونية');
            const oldFolderPath = path.join(libraryPath, oldName);
            const newFolderPath = path.join(libraryPath, cleanNewName);
            
            if (!fs.existsSync(oldFolderPath)) {
                return { success: false, error: 'المجلد الأصلي غير موجود' };
            }

            if (fs.existsSync(newFolderPath)) {
                return { success: false, error: 'يوجد مجلد بنفس الاسم الجديد' };
            }

            // إعادة تسمية المجلد
            fs.renameSync(oldFolderPath, newFolderPath);
            return { success: true, message: `تم تغيير اسم المجلد إلى "${cleanNewName}"`, newName: cleanNewName };
        } catch (error) {

            return { success: false, error: error.message };
        }
    });

    // إرفاق ملفات لمجلد موجود
    ipcMain.handle('attach-files-to-folder', async (event, folderName) => {
        try {
            const desktopPath = path.join(os.homedir(), 'Desktop');
            const libraryPath = path.join(desktopPath, 'المكتبة القانونية');
            const folderPath = path.join(libraryPath, folderName);
            
            if (!fs.existsSync(folderPath)) {
                return { success: false, message: 'المجلد غير موجود' };
            }

            // إظهار نافذة اختيار الملفات
            const result = await dialog.showOpenDialog(mainWindow, {
                title: `إرفاق ملفات لمجلد "${folderName}"`,
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: 'جميع الملفات', extensions: ['*'] }
                ],
                defaultPath: require('os').homedir()
            });

            if (!result.canceled && result.filePaths.length > 0) {
                // نسخ الملفات المختارة للمجلد
                for (const filePath of result.filePaths) {
                    const fileName = path.basename(filePath);
                    const destPath = path.join(folderPath, fileName);
                    fs.copyFileSync(filePath, destPath);
                }
                return { 
                    success: true, 
                    message: `تم إرفاق ${result.filePaths.length} ملف`, 
                    filesCount: result.filePaths.length
                };
            } else {
                return { 
                    success: true, 
                    message: 'لم يتم اختيار أي ملفات', 
                    filesCount: 0
                };
            }
        } catch (error) {

            return { success: false, message: 'حدث خطأ في إرفاق الملفات: ' + error.message };
        }
    });

    // فتح موقع تحميل
    ipcMain.handle('open-download-site', async (event, siteNumber) => {
        try {
            // مواقع مفيدة للمحامين
            const sites = {
                '1': 'https://books-library.net/c-Books-Egyption-Law-best-download',
                '2': 'https://foulabook.com/ar/books/%D9%82%D8%A7%D9%86%D9%88%D9%86?page=1',
                '3': 'https://deepai.org/chat/free-chatgpt',
                '4': 'https://moj.gov.eg/ar/Pages/Services/ServicesCatalog.aspx?UserCategory=4',
                '5': 'https://digital.gov.eg/categories',
                '6': 'https://ppo.gov.eg/ppo/r/ppoportal/ppoportal/home'
            };

            const url = sites[siteNumber];
            if (url) {
                // إرسال رسالة للواجهة لفتح الموقع في تبويبة جديدة
                mainWindow.webContents.send('open-website-tab', { url, siteNumber });
                return { success: true, message: `تم فتح الموقع ${siteNumber}` };
            } else {
                return { success: false, message: 'رقم الموقع غير صحيح' };
            }
        } catch (error) {

            return { success: false, message: 'حدث خطأ في فتح الموقع: ' + error.message };
        }
    });
}