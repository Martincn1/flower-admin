import * as XLSX from 'xlsx'
export default function downExcel(jsonData, fileName) {
  // 定义导出文件的格式
  const type = 'xlsx'
  // 配置下载文件
  const config = {
    bookType: type === undefined ? 'xlsx' : type,
    bookSST: false,
    type: 'binary'
  }
  const keyMap = {}
  const tmpdata = {}
  const outputPos = {}
  const tmpWB = {
    SheetNames: [],
    Sheets: {}
  }
  for (const key in jsonData) {
    // 获取keys
    keyMap[key] = []
    tmpdata[key] = jsonData[key][0]
    jsonData[key].unshift({})
    for (const k in tmpdata[key]) {
      keyMap[key].push(k)
      jsonData[key][0][k] = k
    }
    // 用来保存转换好的json
    tmpdata[key] = []
    // 处理单个工作区的表格
    jsonData[key]
      .map((v, i) =>
        keyMap[key].map((k, j) =>
          Object.assign(
            {},
            {
              v: v[k],
              position:
                                (j > 25
                                  ? getCharCol(j)
                                  : String.fromCharCode(65 + j)) +
                                (i + 1)
              // eslint-disable-next-line no-return-assign
            }
          )
        )
      )
      .reduce((prev, next) => prev.concat(next))
      .forEach(
        (v, i) =>
          (tmpdata[key][v.position] = {
            v: v.v
          })
      )
    // 置区域,比如表格从A1到D10
    outputPos[key] = Object.keys(tmpdata[key])
    tmpWB.SheetNames.push(key)
    tmpWB.Sheets[key] = Object.assign(
      {},
      // 内容
      tmpdata[key],
      {
        // 设置填充区域
        '!ref':
                    outputPos[key][0] +
                    ':' +
                    outputPos[key][outputPos[key].length - 1]
      }
    )
  }
  // 这里的数据是用来定义导出的格式类型 创建二进制对象写入转换好的字节流
  const tmpDown = new Blob([s2ab(XLSX.write(tmpWB, config))], {
    type: ''
  })
  saveAs(tmpDown, fileName)
}

function saveAs(obj, fileName) {
  // 导出功能实现
  const tmpa = document.createElement('a')
  tmpa.download = fileName || '下载'
  // 绑定a标签
  tmpa.href = URL.createObjectURL(obj)
  // 模拟点击实现下载
  tmpa.click()
  // 延时释放
  setTimeout(function() {
    // 用URL.revokeObjectURL()来释放这个object URL
    URL.revokeObjectURL(obj)
  }, 100)
}
// 字符串转字符流
function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

function getCharCol(n) {
  let s = ''
  let m = 0
  while (n > 0) {
    m = (n % 26) + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}

// 文件类型校验
function judgeFileType(name) {
  let fileType = name.split('.').pop()
  fileType = fileType.toLowerCase()
  return fileType === 'xlsx' || fileType === 'xls'
}

// 解析excel中手机号，返回数组
export function analyzeExcel(sheet, cb) {
  const result = []
  for (const item in sheet) {
    if (item.indexOf('A') > -1) {
      const value = sheet[item].v.toString()
      if (value !== '手机号') {
        if (value.length !== 11) {
          const err = 'phone error'
          cb(err) // eslint规定cb参数为变量
          return
        }
        result.push(value)
      }
    }
  }
  cb(result)
}

// 读取excel中内容
export function readExcel(file, cb) {
  if (!judgeFileType(file.name)) {
    const err = 'type error'
    cb(err) // eslint规定cb参数为变量
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = e.target.result
    const workbook = XLSX.read(data, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    analyzeExcel(sheet, cb)
  }
  reader.readAsBinaryString(file)
}
