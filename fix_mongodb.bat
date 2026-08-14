@echo off
setlocal
set MONGO_DIR=D:\MongoDB
set DATA_DIR=%MONGO_DIR%\data
set LOG_DIR=%MONGO_DIR%\log
set CONFIG=C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg

if not exist "%MONGO_DIR%" mkdir "%MONGO_DIR%"
if not exist "%DATA_DIR%" mkdir "%DATA_DIR%"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

icacls "%DATA_DIR%" /grant "NT AUTHORITY\NETWORKSERVICE:(OI)(CI)F" >nul 2>&1
icacls "%LOG_DIR%" /grant "NT AUTHORITY\NETWORKSERVICE:(OI)(CI)F" >nul 2>&1

> "%CONFIG%" echo # mongod.conf
>> "%CONFIG%" echo.
>> "%CONFIG%" echo storage:
>> "%CONFIG%" echo   dbPath: D:\MongoDB\data
>> "%CONFIG%" echo.
>> "%CONFIG%" echo systemLog:
>> "%CONFIG%" echo   destination: file
>> "%CONFIG%" echo   logAppend: true
>> "%CONFIG%" echo   path: D:\MongoDB\log\mongod.log
>> "%CONFIG%" echo.
>> "%CONFIG%" echo net:
>> "%CONFIG%" echo   port: 27017
>> "%CONFIG%" echo   bindIp: 127.0.0.1

sc stop MongoDB >nul 2>&1
sc start MongoDB

ping 127.0.0.1 -n 5 >nul
mongosh --eval "db.runCommand({ ping: 1 })"
endlocal
