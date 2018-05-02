

server {
    // 80端口是linux服务器的http协议默认端口
    listen 80;  
    // 域名                            
    server_name kdbn.xuhaodong.cn;  
    // 当访问 http://kdbn.xuhaodong.cn/ 时      
    location / {   
          // 文件根目录路径，在服务器下/data/kdbn/            
          root /data/kdbn/;           
          // $uri指的是浏览器的url，比如http://kdbn.xuhaodong.cn/a.html， 
          // 尝试获取3个路径/data/kdbn/目录下的文件，
          // 分别是/data/kdbn/a.html、/data/kdbn/a.html/index.html、/data/kdbn/index.html          
          try_files $uri $uri/ /index.html; 
          // 首页为/data/kdbn/index.html
          index index.html;
    }
    // 将index.html中所有以/api开头的http请求通过nginx转发
    location /api {
            // 转发到后台接口地址，现在这个地址是数据模拟接口的地址
            proxy_pass https://easy-mock.com/mock/5ae6bc6c7e1b090ed5b8d892/api;
    }
}
