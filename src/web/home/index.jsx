import React from 'react'
import Img from 'images/gongan.png'

// class home
// 执行构造函数
// 定义一些初始值
// 执行函数
// 顺序：同步函数等待异步函数执行后再执行
const H1Cp = () => <h1>2133</h1>

const data = {
  name1: '1111',
  name2: '2222'
}
const arowFun = () => {
  console.log('() => {}')
}
class Home {
  constructor() {
    this.state = {
      ...data,
      name3: '3333'
    }
    arowFun()
    this.render()
  }
  async render() {
    await this.init() 
    console.log('run next function...')
    this.create()
  }
  init() {
    console.log('runing async...')
    return new Promise((resolve) => setTimeout(() => {
      console.log('run async success!')
      resolve()
    }, 2000))
  }
  getValue(valueKey) {
    return this.state?.[valueKey] || `key: ${valueKey} is undefined`
  }
  create() {
    console.log('start create11221', this.getValue('name1'),  this.getValue('name2'),  this.getValue('name3'));
  }
}

export default H1Cp