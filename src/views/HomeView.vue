<template>
  <div style="width: 1200px;margin: 30px auto;">
		<div style="margin-left: 100px;">
			<el-popover width="370" placement="bottom" trigger="click">
				<div>
					<el-input v-model="specName" ref="inputspecRef" @keyup.enter="addSpecName()" placeholder="请输入规格名称">
						<template #append>
							<el-button type="primary" size="small" @click="addSpecName()">添加规格名</el-button>
						</template>
					</el-input>
				</div>
				<template #reference>
					<el-button>添加规格</el-button>
				</template>
			</el-popover>
		</div>
		<div style="width: 500px;">
			<div v-if="specData.specList.length > 0">
				<div v-for="(item, index) in specData.specList" :key="index">
					<div>
						<h3 style="display: flex;align-items: center;">
							<span>{{ item.label }}</span>
							<span style="margin-left: 15px;" @click="onDeletSpec(index)">
								<el-icon>
									<Close />
								</el-icon>
							</span>
						</h3>
					</div>
					<div style="display: flex;">
						<div v-for="(tagName, tagIndex) in item.tags" :key="tagIndex">
							<el-tag @close="onDeletSpecValue(index, tagIndex)" closable :disable-transitions="false" style="margin: 0 10px;">{{ tagName
							}}</el-tag>
						</div>
						<div>
							<el-input v-if="inputIndex === index && inputVisible" size="small" ref="inputRef"
								v-model="inputTags" @keyup.enter="handleInputConfirm(index, item.label)"
								@blur="handleInputConfirm(index, item.label)" />
							<el-button v-else size="small" @click="onClilkInput(index)">添加规格值</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-table :data="submitList" border>
			<el-table-column v-for="(item, index) in specData.specList" :label="item.label" :key="index">
				<template #default="{ row, column }">
					<span>{{ row[column.label] }}</span>
				</template>
			</el-table-column>
			<el-table-column v-for="(item, index) in tableHader" :label="item.label" :key="index">
				<template #default="{ $index }">
					<el-input-number v-if="item.label === '价格'" v-model="submitList[$index][item.key]" :precision="2"
						size="small" />
					<el-input-number v-else-if="item.label === '库存'" v-model="submitList[$index][item.key]" size="small" />
          <el-input-number v-else-if="item.label === '原价'" v-model="submitList[$index][item.key]" size="small" />
          <el-input v-else v-model="submitList[$index][item.key]" size="small" />
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
// import { ElMessage } from 'element-plus'
// @ is an alias to /src
import { nextTick } from 'vue'
export default {
  data () {
    return {
      specName: '',
      specValue: '',
      inputTags: '',
      inputIndex: 0,
      inputRef: '',
      inputspecRef: '',
      inputVisible: false,
      specData: {
        specList: [],
        skuValue: {}
      },
      submitList: [],
      tableHader: [
        { label: '价格', key: 'price' },
        { label: '库存', key: 'stock' },
        { label: '原价', key: 'costprice' },
        { label: '图片', key: 'picture' }
      ],
      watch: {
        submitList: {
          handler (newVal) {
          },
          deep: true
        }
      }
    }
  },
  // created () {
  //   this.tableSKU()
  // },
  methods: {
    addSpecName () {
      // if (this.specName == '') {
      //   this.specData.specList.push(
      //   { lable: this.specName, tags: [] };
      //   this.specName == '';
      // ) else {
      //   ElMessage.warning('输入规格名称')
      // }
      // }
      this.specData.specList.push({ label: this.specName, tags: [] })
      this.specName = ''
    },
    delPrivateSpec (index) {
      this.item.splice(index, 1)
    },
    // showInput (attr, index) {
    //   attr.inputVisible = true
    //   this.$nextTick((_) => {
    //     this.$refs[`saveTagInput${index}`][0].$refs.input.focus()
    //     console.log(this.specName, this.specValue)
    //   })
    // },
    handleInputConfirm (index, label) {
      if (this.inputTags) {
        this.specData.specList[index].tags.push(this.inputTags)
        if (!this.specData.skuValue[label]) this.specData.skuValue[label] = [this.inputTags]
        this.specData.skuValue[label].push(this.inputTags)
        this.inputTags = ''
        this.inputVisible = !this.inputVisible
        this.tableSKU()
      }
      // this.inputTags = ''
    },
    onClilkInput (index) {
      this.inputVisible = !this.inputVisible
      this.inputIndex = index
      nextTick(() => {
        this.inputRef[0]?.input?.focus()
      })
    },
    onDeletSpec (index) {
      delete this.specData.skuValue[this.specData.specList[index].label]
      this.specData.specList.splice(index, 1)
      this.tableSKU()
    },
    onDeletSpecValue (index, tagIndex) {
      this.specData.skuValue[this.specData.specList[index].label].splice(tagIndex, 1)
      this.specData.specList[index].tags.splice(tagIndex, 1)
      this.tableSKU()
    },
    tableSKU () {
      let temp = []
      this.specData.specList.forEach((item, index) => {
        if (!temp.length) {
          temp.push(
            ...item.tags.map((t, k) => {
              const oldValue = this.submitList.find(v => v.sku === t)
              if (oldValue) {
                return { ...oldValue }
              } else {
                return {
                  [`skuName${index + 1}`]: item.label,
                  [`skuValue${index + 1}`]: t,
                  [item.label]: t,
                  price: 0,
                  stock: 0,
                  sku: t
                }
              }
            })
          )
        } else {
          const array = []
          temp.forEach((obj, objKey) => {
            if (item.tags.length === 0) array.push(obj)
            array.push(...item.tags.map((t, i) => {
              if (obj.sku) obj.sku = obj.sku + t
              const oldValue = this.submitList.find(item => item.sku === obj.sku)
              if (oldValue) return { ...oldValue }
              else {
                return {
                  ...obj,
                  [`skuName${index + 1}`]: item.label,
                  [`skuValue${index + 1}`]: t,
                  [item.label]: t,
                  price: 0,
                  stock: 0
                }
              }
            }))
          })
          temp = array
        }
      })
      console.log('temp', temp)
      this.submitList = temp
    }
  }
}
</script>
