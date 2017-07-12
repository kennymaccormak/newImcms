(function (Imcms) {
    Imcms.REST = {
        create: function (url) {
            console.log(url);
        },
        read: function () {
            return [
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2019",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018/flowers",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018/flowers/black",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2018/flowers/rose/beer",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars/bmw",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars/lada",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars/lada/kalyna",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/holiday",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/holiday",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/spring",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family/foto",
                "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/img"
            ];
        },
        update: function (url) {
            console.log(url);
        },
        remove: function (url) {
            console.log(url);
        }
    }
})(Imcms);