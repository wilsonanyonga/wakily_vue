<template>
  <div class="app-container">
    <div class="filter-container">
      

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.roles.toLowerCase().includes(search.toLowerCase()))"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('search')" prop="search" width="auto" align="left">
        <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
        </template>



      <!-- <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="auto">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->

      <el-table-column :label="$t('Task Details')" prop="description" width="auto" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Status')" prop="priority" width="auto" align="center">
        <template slot-scope="scope">
          <!-- <span></span> -->
            <div v-if="scope.row.priority === 'Pending'">
                <el-tag type="danger">{{ scope.row.priority }}</el-tag>
            </div>
            <div v-else-if="scope.row.priority === 'Completed'">
                <el-tag type="success">{{ scope.row.priority }}</el-tag>
            </div>
            <div v-else>
               <el-tag type="info">{{ scope.row.priority }}</el-tag>
            </div>
          
        </template>
      </el-table-column>

      <el-table-column :label="$t('Due Date')" prop="due_date" width="auto" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.due_date }}</span>
        </template>
      </el-table-column>

      

      <el-table-column :label="$t('table.actions')" align="center" width="auto" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>

          <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            {{ $t('table.delete') }}
          </el-button> -->
          <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="deleteData(row)">
            {{ $t('table.delete') }}
          </el-button> -->
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto" style="width: auto;">

        

        <el-form-item label="Status" prop="priority">
          <template>
            <el-select :label="$t('Status')" v-model="temp.priority" clearable placeholder="Select" prop="priority">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </template>
        </el-form-item>
        

        <!-- <el-form-item :label="$t('table.password')" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button> -->
        <el-button :loading="loading" type="primary" @click="dialogStatus==='create'?createData():updateForm('dataForm')">Submit</el-button>
        <!-- <el-button @click="dialogFormVisible2 = true">
          open
        </el-button> -->
      </div>
    </el-dialog>

    <!-- <el-dialog :title="textMap2[dialogStatus2]" :visible.sync="dialogFormVisible2">
      <el-form ref="dataForm2" :rules="rules" :model="temp" label-position="left" label-width="auto" style="width: auto;">
        <p>something goes here</p> -->
        <!-- <el-form-item :label="$t('table.id')" prop="id">
          <el-input v-model="temp.id" />
        </el-form-item>

        <el-form-item :label="$t('table.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item :label="$t('table.email')" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>

        <el-form-item :label="$t('table.roles')" prop="roles">
          <el-input v-model="temp.roles" />
        </el-form-item> -->
      <!-- </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">
          {{ $t('table.cancel') }}
        </el-button> -->

        <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button> -->
        <!-- <el-button :loading="loading" type="primary" @click="dialogStatus2==='create'?createData():updateForm('dataForm')">Submit</el-button> -->
      <!-- </div>
    </el-dialog> -->

  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
// import { fetchList } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { MessageBox } from 'element-ui'
// for image
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'Crud',
  components: { Pagination, ImageCropper, PanThumb },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      options: [{
          value: 'Completed',
          label: 'Completed'
        }, {
          value: 'Pending',
          label: 'Pending'
        }],
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      tableKey: 0,
      search: '',
      loading: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        name: '',
        email: '',
        roles: '',
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogStatus: '',
      dialogStatus2: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      textMap2: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        name: [
        { required: true, message: 'Please input the Date', trigger: 'blur' },
        ],
        email: [
        { required: true, message: 'Please input the Date', trigger: 'blur' },
        ],
        roles: [
        { required: true, message: 'Please input the Date', trigger: 'blur' },
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$store.dispatch('user/fetchUser_tasks').then(response => {

        this.list = response
        console.log(this.list)

        // this.total = response.length

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    deleteData(row) {
      this.loading = true
      // const index = this.list.indexOf(row)
      // const index2 = this.list;index
      const rowData = row
      console.log(rowData)
      MessageBox.confirm('Are you sure you want to delete this', 'Confirm deletion', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
      }).then(() => {
          this.$store.dispatch('user/deleteData', rowData).then(() => {
              this.loading = false
              this.dialogFormVisible = false
              this.$notify({
                title: 'success',
                message: 'Deleted successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
          })
      })
      .catch(() => {
                this.loading = false
                this.dialogFormVisible = false
                this.getList()
                console.log('general err ' + error)
                // console.log('homepage')
              })
    },
    updateForm() {
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              // alert('submit!');
              this.loading = true
              console.log(this.temp)
              this.$store.dispatch('user/updateData_task', this.temp)
              // const data = inputData(this.$refs[ruleForm])
              .then(() => {
                // this.$router.push({ path: this.redirect || '/create/create' })
                // this.$message({
                // showClose: true,
                // message: 'The user has been added.',
                // type: 'success'
                // });
                this.loading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: 'success',
                  message: 'Created successfully',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              })
              .catch(() => {
                this.loading = false
                this.dialogFormVisible = false
                console.log('general err ' + error)
                // console.log('homepage')
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });

      },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Name', 'Email', 'Roles']
        const filterVal = ['name', 'email', 'roles']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
