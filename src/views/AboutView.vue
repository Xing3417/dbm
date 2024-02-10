<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <el-form>
    <el-form-item label="商品分类">
      <el-select ref="cateoryname" @change="getcategory" style="width: 240px;">
        <el-option v-for="item in cateorys"  :key="item.id" :label="item.name" :value="item.id" ></el-option>
      </el-select>
      <el-select ref="childname" @change="getcategory" style="width: 240px;">
        <el-option v-for="item in child"  :key="item.id" :label="item.name" :value="item.id" ></el-option>
      </el-select>
    </el-form-item>
    <el-button @click="login">登录</el-button>
  </el-form> -->
</div>
<div>
  <!-- @cell-click="tabHader" -->
<el-table :data="tableData" style="width: 80%" >
    <el-table-column  :label="item.tableNmae" :key="i" v-for="(item,i) in tableHeader">
      <template v-slot="scope">
        <span>{{ tableData[scope.$index][item.tableCode] }}</span>
          <!-- <span>{{ tableData[scope.$index] }}</span> -->
      </template>
    </el-table-column>
    <el-table-column >
    </el-table-column>
</el-table>
<el-table>
  <el-table-column>
    aa
  </el-table-column>
</el-table>
</div>
<!-- <div>
  <el-table-column  :label="date" v-for="(date, key) in header" :key="key">
		  <template v-slot="scope">
			  {{data_list[scope.$index][key]}}
		  </template>
	  </el-table-column>
</div> -->
</template>
<script>
export default {
  data () {
    return {
      tableHeader: [
        {
          tableNmae: '位置',
          tableCode: 'weizhi',
          uclick: '新增'
        },
        {
          tableNmae: '应租面积(m²)',
          tableCode: 'yingzu'
        },
        {
          tableNmae: '实租面积(m²)',
          tableCode: 'shizu'
        },
        {
          tableNmae: '待租面积(m²)',
          tableCode: 'daizu'
        },
        {
          tableNmae: '利用率',
          tableCode: 'liyon'
        },
        {
          tableNmae: '操作',
          tableCode: 'edit'
        }
      ],
      // 表格内容
      tableData: [

        {
          weizhi: '商务楼',
          yingzu: '20',
          shizu: '30',
          daizu: '40',
          liyon: '20%',
          uclick: '新增'
        },
        {
          weizhi: '公寓楼',
          yingzu: '20',
          shizu: '30',
          daizu: '40',
          liyon: '20%'
        },
        {
          weizhi: '办公楼',
          yingzu: '20',
          shizu: '30',
          daizu: '40',
          liyon: '20%'
        },
        {
          weizhi: '餐厅商铺',
          yingzu: '20',
          shizu: '30',
          daizu: '40',
          liyon: '20%'
        }
      ],
      HandleClick: [
        {
          uname: '新增'
        }

      ],
      // 表头数据
      header: ['A', 'B', 'C'],
      // 内容数据
		  data_list: [
			  [1, 2, 3],
			  [4, 5, 6]
      ]
    }
  },
  methods: {
    tabHader (row, column, cell, event) {
      console.log('row', row)
      console.log('column', column)
      console.log('cell', cell)
      console.log('event', event)
    },
    handleEdit (index, row) {
      // JSON.stringify 将对象转换成字符串
      alert(JSON.stringify(row), JSON.stringify(index))
    },
    editclick (index, row) {
      console.log(index, row)
    }
  }
}
</script>
