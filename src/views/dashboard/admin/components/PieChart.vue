<template>
  
    <div :class="className" :style="{height:height,width:width}" />
  
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '550px'
    }
  },
  data() {
    return {
      chart: null,
      acting_for: null
    }
  },
  mounted() {
    
    this.$nextTick(() => {
      this.initChart()
    })
    
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.acting_for = this.$store.dispatch('user/fetchDash').then(response => {

        this.acting_for = response.acting_for
        
        // const gety = this.acting_for
        // console.log(this.acting_for)
        // return gety
        console.log(this.acting_for)
        // console.log(this.gety)
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          title: {
              text: 'Acting For',
              left: 'center'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['Defendant', 'Claimant', 'Plaintiff', 'Respondent', 'Applicant', 'Petitioner', 'Appealant', 'Republic', 'Accused', 'Vendor', 'Purchaser', 'Assignor', 'Assignee', 'Chargor', 'Chargee', 'Mortgagor', 'Mortgagee', 'Donor', 'Donee', 'Allotee', 'Agent', 'Principal', 'Seller', 'Buyer', 'Franchisor', 'Franchisee', 'Grantor', 'Creditor', 'offeror', 'Offeree', 'Target Company', 'Acquiring Company']
          },
          calculable: true,
          series: [
            {
              name: 'Acting For',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 110],
              center: ['50%', '20%'],
              label: {
                show: false
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
              data: this.acting_for,
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
        
      })
      // this.acting_for = [
      //         { value: 1, name: 'Defendant' },
      //         { value: 1, name: 'Claimant' }
      //       ]
      
    }
  }
}
</script>
