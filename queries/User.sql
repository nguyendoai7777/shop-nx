select * from channel;

select * from externallink;

insert into externallink (channelId, url, shortname) values (5, "https://www.youtube.com/@kayffchill", "YT: COnchokay");

insert into externallink (channelId, url, shortname) values (5, "https://www.facebook.com/search/top?q=tr%C6%B0%C6%A1ng%20tu%E1%BA%A5n%20t%C3%BA", "FB: Tá selu");

update externallink set avatarUrl = 'https://www.youtube.com/s/desktop/9af06a99/img/favicon_144x144.png' where  id = 7;
update externallink set avatarUrl = 'https://static.xx.fbcdn.net/rsrc.php/yB/r/2sFJRNmJ5OP.ico' where  id = 8;