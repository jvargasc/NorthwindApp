-- In the NorthWind Db execute:
CREATE USER northwinddbuser FOR LOGIN northwinddbuser WITH DEFAULT_SCHEMA = dbo
​
EXEC sp_addrolemember 'db_datareader', 'northwinddbuser'​
EXEC sp_addrolemember 'db_datawriter', 'northwinddbuser'