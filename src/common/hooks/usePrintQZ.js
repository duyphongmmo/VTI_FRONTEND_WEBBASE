import { useState, useEffect, useCallback } from 'react'

import qz from 'qz-tray'
// import { api } from '~/services/api'

export function useQZPrint({ skipCertificate = true } = {}) {
  const [connected, setConnected] = useState(false)
  const [printers, setPrinters] = useState([])
  const [error, setError] = useState(null)
  const [device, setDevice] = useState('')

  // const setupSecurity = useCallback(() => {
  //   try {
  // if (skipCertificate) {
  //   qz.security.setCertificatePromise(() => Promise.resolve())
  //   qz.security.setSignaturePromise(() => Promise.resolve(''))
  // } else {
  //     qz.security.setCertificatePromise(() =>
  //       api
  //         .get('/v1/users/companies/get-key')
  //         .then((r) => {
  //           console.log('SIGN status:', r)
  //           return r.json()
  //         })
  //         .catch((e) => {
  //           console.error('CERT error', e)
  //           throw e
  //         }),
  //     )
  //     qz.security.setSignaturePromise((toSign) => {
  //       console.log('SIGN toSign:', toSign)
  //       return api
  //         .post('/v1/users/companies/sign-qz', { data: toSign })
  //         .then((r) => {
  //           console.log('SIGN status:', r.status)
  //           return r.json()
  //         })
  //         .then((json) => {
  //           console.log('SIGNature:', json.signature)
  //           return json.signature
  //         })
  //         .catch((e) => {
  //           console.error('SIGN error', e)
  //           throw e
  //         })
  //     })
  // }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [skipCertificate])

  const connect = useCallback(() => {
    if (!skipCertificate) {
      qz.security.setCertificatePromise(() => Promise.resolve())
      qz.security.setSignaturePromise(() => Promise.resolve(''))
    }

    return qz.websocket
      .connect()
      .then(() => {
        setConnected(true)
        return qz.printers.find()
      })
      .then((list) => setPrinters(list))
      .catch((err) => {
        setError(err)
      })
  }, [skipCertificate])
  const disconnect = useCallback(() => {
    return qz.websocket
      .disconnect()
      .then(() => setConnected(false))
      .catch((err) => {
        setError(err)
      })
  }, [])

  const print = useCallback(
    (data, configOptions = {}) => {
      if (!connected) {
        return Promise.reject(new Error('Connect failed'))
      }
      const config = qz.configs.create(device, configOptions)
      return qz.print(config, data).catch((err) => {
        setError(err)
        throw err
      })
    },
    [connected],
  )

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    connected,
    printers,
    error,
    connect,
    disconnect,
    print,
    device,
    setDevice,
  }
}
