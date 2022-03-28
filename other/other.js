import "@babel/polyfill"
cosnole.log(123)

import './style/style.less'
import './img/1.png'
import './img/2.jpeg'

import { add } from './math.js'
// import _ from 'lodash'
const arr = [1,2,3]
arr.map(item => {
  console.log(444)
  item * 2
})

add(2,3)


function getComponnet() {
  return import(/* webpackChunkName:"lodash" */'lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['Dell', 'Lee'], '-')
    return element
  })
}

getComponnet().then(element => {
  document.body.appendChild(element)
})
