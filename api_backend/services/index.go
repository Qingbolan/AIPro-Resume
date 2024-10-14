package services

import (
    "log"
    "net"

    all_apis "api_backend/kitex_gen/all_api/allapisservice"
    "github.com/cloudwego/kitex/server"
)

func StartKitexServer() {
    // 将字符串形式的地址转换为 net.Addr 类型
    addr, err := net.ResolveTCPAddr("tcp", "0.0.0.0:8001")
    if err!= nil {
       log.Fatal(err)
    }
    // 创建 Kitex 服务器
    svr := all_apis.NewServer(new(AllAPIsServiceImpl),
       server.WithServiceAddr(addr),
    )

    // 启动服务器
    err = svr.Run()
    if err!= nil {
       log.Fatal(err)
    }
}