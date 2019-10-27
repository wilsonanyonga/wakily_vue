<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import school_dashboard from './school_dashboard'
import student_dashboard from './student_dashboard'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, school_dashboard, student_dashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('sadmin')) {
      this.currentRole = 'school_dashboard'
    }else if (this.roles.includes('normalUser')){
      this.currentRole = 'student_dashboard'
    }
  }
}
</script>
