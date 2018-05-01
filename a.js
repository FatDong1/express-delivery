server {
    listen 80;                              // 80端口是linux服务器的http协议默认端口
    server_name device.xuhaodong.cn;        // 域名
    location / {                            // 当访问 http://device.xuhaodong.cn/ 时
          root /data/spot-check/;           // 文件目录路径，在服务器下/data/spot-check
          // $uri指的是http://device.xuhaodong.cn， 尝试获取3个路径/data/spot-check/目录下的文件，分别是http://device.xuhaodong.cn、http://device.xuhaodong.cn/、http://device.xuhaodong.cn/index.html          
          try_files $uri $uri/ /index.html; 
          index index.html;
    }
    location /api {
            proxy_pass https://easy-mock.com/mock/5ae6bc6c7e1b090ed5b8d892/api;
    }
}
