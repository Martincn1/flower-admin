import * as XLSX from 'xlsx'
export default function onImportExcel(file) {
  return new Promise((resolve, reject) => {
    // 获取上传的文件对象
    // 通过FileReader对象读取文件
    const fileReader = new FileReader()
    fileReader.onloadend = event => {
      try {
        const { result } = event.target
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' })
        // 存储获取到的数据
        const data = {}
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
          if (sheet) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data[sheet] = []
            data[sheet] = data[sheet].concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            // 如果只取第一张表，就取消注释这行
            // break;
          }
        }
        resolve(data)
      } catch (e) {
        reject(e)
      }
    }
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(file)
  })
}
