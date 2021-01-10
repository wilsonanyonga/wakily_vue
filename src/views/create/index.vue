<template>
  <div class="app-container documentation-container">
    <!-- <el-alert
      title="success alert"
      type="success"
      center
      show-icon>
    </el-alert> -->
    <el-row :gutter="24">
      <el-col :xs="1" :sm="3" :md="10" :lg="8" :xl="8"></el-col>
      <el-col :xs="22" :sm="18" :md="4" :lg="8" :xl="8">
        <p>Create A New User</p>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">

          <el-form-item label="Name" prop="name">
            <el-input @keydown.space="(event) => event.preventDefault()" type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="Role" prop="roles">
            <el-input type="text" v-model="ruleForm.roles" autocomplete="off"></el-input>
          </el-form-item> -->

          <el-form-item label="Role" prop="roles">
            <template>
              <el-select v-model="ruleForm.roles" clearable placeholder="Select Role">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>

          <el-form-item>
            <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">Submit</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="1" :sm="3" :md="10" :lg="8" :xl="8"></el-col>
  </el-row>
  </div>
</template>
<script>
// import DropdownMenu from '@/components/Share/DropdownMenu'
import { Message } from 'element-ui';
// import { inputData } from '@/api/user';

export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the age'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
          } else {
            if (value < 18) {
              callback(new Error('Age must be greater than 18'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the name'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the email'));
        } else {
          callback();
        }
      };
      var validateRole = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the role'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          email: '',
          roles: '',
          pass: '',
          checkPass: '',
          age: ''
        },
        loading: false,
        options: [{
          value: 'sadmin',
          label: 'Senior Account'
        }, {
          value: 'normalUser',
          label: 'Junior Account'
        }],
        rules: {
          name: [
            { validator: validateName, trigger: 'blur', required: true }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur', required: true },
            { type: 'email', trigger: 'blur' }
          ],
          roles: [
            { validator: validateRole, trigger: 'blur', required: true }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur', required: true }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur', required: true }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       // alert('submit!');
      //       this.loading = true
      //       this.$store.dispatch('user/inputData', this.formName)
      //       .then(() => {
      //         this.$router.push({ path: this.redirect || '/create', query: this.otherQuery })
      //         this.$message({
      //         showClose: true,
      //         message: 'The user has been added.',
      //         type: 'success'
      //         });
      //         this.loading = false
      //       })
      //       .catch(() => {
      //         this.loading = false
      //         console.log('general err ' + error)
      //       })

      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },
      submitForm() {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              // alert('submit!');
              this.loading = true
              this.$store.dispatch('user/inputData', this.ruleForm)
              // const data = inputData(this.$refs[ruleForm])
              .then(() => {
                this.$router.push({ path: this.redirect || '/create' })
                this.$message({
                showClose: true,
                message: 'The user has been added.',
                type: 'success'
                });
                this.loading = false
                this.$refs.ruleForm.resetFields();
              })
              .catch(() => {
                this.loading = false
                console.log('general err ' + error)
                // console.log('homepage')
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
// .documentation-container {
//   margin: 50px;
//   .document-btn {
//     float: left;
//     margin-left: 50px;
//     display: block;
//     cursor: pointer;
//     background: black;
//     color: white;
//     height: 60px;
//     width: 200px;
//     line-height: 60px;
//     font-size: 20px;
//     text-align: center;
//   }
// }
</style>
