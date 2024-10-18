// services/database.go
package services

import (
    "log"
    "github.com/dgraph-io/badger/v3"
)

var db *badger.DB

func InitDB() {
    opts := badger.DefaultOptions("./badger")
    opts.Logger = nil // 禁用Badger的日志输出，如果需要可以配置日志
    var err error
    db, err = badger.Open(opts)
    if err != nil {
        log.Fatal(err)
    }
}

func CloseDB() {
    if err := db.Close(); err != nil {
        log.Fatal(err)
    }
}