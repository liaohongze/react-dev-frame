import Client from './Client'
let logstatus = false

const auth = {
  login: (cb) => {
    Client.login(result => {
      logstatus = result.code === 0
      const success = true
      const failed = false
      if (logstatus) {
        cb(success)
      } else {
        cb(failed)
      }
    })
  },
  logout: () => {
    logstatus = false
  }
}

export {logstatus, auth}