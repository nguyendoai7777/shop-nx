

insert into externallink (channelId, url, shortname) values (5, "https://www.youtube.com/@kayffchill", "YT: COnchokay");

insert into externallink (channelId, url, shortname) values (5, "https://www.facebook.com/search/top?q=tr%C6%B0%C6%A1ng%20tu%E1%BA%A5n%20t%C3%BA", "FB: Tá selu");

update externallink set avatarUrl = 'https://www.youtube.com/s/desktop/9af06a99/img/favicon_144x144.png' where  id = 7;
update externallink set avatarUrl = 'https://static.xx.fbcdn.net/rsrc.php/yB/r/2sFJRNmJ5OP.ico' where  id = 8;


select * from user where channel = 'tadaX';

update user set channel = 'conchobinh' where id = 27;


delete from user where id between 11 and 78;



update user set channel = null, verified = false where id = 81;
delete from subscription where userId = 81;
delete from channel where userId = 81;

select * from channel;

select * from externallink;

select * from channel;