<script>
export default {
  name: 'vehicle-analytics-detail',
  
  props: {
    analytics: {
      type: Object,
      default: null
    }
  },

  computed: {
    maintenanceRiskLevel() {
      const t = this.$t;
      const risk = this.analytics?.predictedMaintenanceRisk || 0;
      if (risk < 0.3) return { level: t('vehicle_management.detail.analytics.predictive_maintenance.risk_levels.low'), severity: 'success' };
      if (risk < 0.7) return { level: t('vehicle_management.detail.analytics.predictive_maintenance.risk_levels.medium'), severity: 'warn' };
      return { level: t('vehicle_management.detail.analytics.predictive_maintenance.risk_levels.high'), severity: 'danger' };
    },

    fuelConsumptionRating() {
      const t = this.$t;
      const consumption = this.analytics?.averageFuelConsumption || 0;
      if (consumption <= 6) return { rating: t('vehicle_management.detail.analytics.fuel_efficiency.ratings.excellent'), severity: 'success' };
      if (consumption <= 8) return { rating: t('vehicle_management.detail.analytics.fuel_efficiency.ratings.good'), severity: 'info' };
      if (consumption <= 10) return { rating: t('vehicle_management.detail.analytics.fuel_efficiency.ratings.average'), severity: 'warn' };
      return { rating: t('vehicle_management.detail.analytics.fuel_efficiency.ratings.high'), severity: 'danger' };
    },

    drivingBehaviorScore() {
      const t = this.$t;
      const behavior = this.analytics?.drivingBehavior;
      if (!behavior) return { score: t('common.na'), severity: 'info' };
      
      const harshEvents = (behavior.harshBrakingCount || 0) + (behavior.rapidAccelerationCount || 0);
      if (harshEvents <= 2) return { score: t('vehicle_management.detail.analytics.driving_behavior.scores.excellent'), severity: 'success' };
      if (harshEvents <= 5) return { score: t('vehicle_management.detail.analytics.driving_behavior.scores.good'), severity: 'info' };
      if (harshEvents <= 10) return { score: t('vehicle_management.detail.analytics.driving_behavior.scores.fair'), severity: 'warn' };
      return { score: t('vehicle_management.detail.analytics.driving_behavior.scores.poor'), severity: 'danger' };
    },

    hasAdditionalData() {
      if (!this.analytics) return false;
      
      const additionalFields = [
        'co2Emissions', 'averageTripDistance', 'estimatedFuelCost', 
        'overallPerformanceScore', 'monthlyComparisonPercent', 
        'dataCompletenessPercent', 'analysisConfidence', 'dataSource'
      ];
      
      return additionalFields.some(field => 
        this.analytics[field] !== undefined && this.analytics[field] !== null
      );
    }
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return this.$t('common.na');
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      } catch (error) {
        return dateString;
      }
    },

    getRiskPercentage(risk) {
      return Math.round((risk || 0) * 100);
    }
  }
};
</script>

<template>
  <div class="flex flex-column pb-4 gap-4" v-if="analytics">
    
    <!-- ====================== Card -> Fuel Efficiency Analytics ====================== -->
    <pv-card class="w-full">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-chart-line" style="color: white;"></i>
          <span class="text-lg font-bold">{{ $t('vehicle_management.detail.analytics.fuel_efficiency.title') }}</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid">
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-chart-bar text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.fuel_efficiency.average_consumption') }}
            </label>
            <div class="flex align-items-center gap-3 mt-2">
              <span class="text-3xl font-bold text-primary">{{ analytics.averageFuelConsumption || $t('common.na') }}</span>
              <span class="text-sm text-color-secondary">{{ $t('vehicle_management.detail.analytics.fuel_efficiency.units.l_per_100km') }}</span>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-star text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.fuel_efficiency.efficiency_rating') }}
            </label>
            <pv-tag 
              :value="fuelConsumptionRating.rating" 
              :severity="fuelConsumptionRating.severity"
              class="mt-2 text-lg px-3 py-2"
            />
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-trending-up text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.fuel_efficiency.fuel_economy_trend') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ 
                analytics.fuelEconomyTrend === 'Improving' ? $t('vehicle_management.detail.analytics.fuel_efficiency.trends.improving') : 
                analytics.fuelEconomyTrend === 'Declining' ? $t('vehicle_management.detail.analytics.fuel_efficiency.trends.declining') : 
                $t('vehicle_management.detail.analytics.fuel_efficiency.trends.stable') 
              }}</p>
              <i :class="analytics.fuelEconomyTrend === 'Improving' ? 'pi pi-arrow-up text-green-500' : 
                         analytics.fuelEconomyTrend === 'Declining' ? 'pi pi-arrow-down text-red-500' : 
                         'pi pi-minus text-blue-500'"></i>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-stopwatch text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.fuel_efficiency.total_distance') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.totalDistanceTraveled?.toLocaleString() || $t('common.na') }}</p>
              <span class="text-sm text-color-secondary" v-if="analytics.totalDistanceTraveled">{{ $t('vehicle_management.detail.analytics.fuel_efficiency.units.km') }}</span>
            </div>
          </div>
        </div>
      </template>
    </pv-card>

    <!-- ====================== Card -> Driving Behavior Analytics ====================== -->
    <pv-card class="w-full">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-users" style="color: white;"></i>
          <span class="text-lg font-bold">{{ $t('vehicle_management.detail.analytics.driving_behavior.title') }}</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid" v-if="analytics.drivingBehavior">
          <!-- First row: Event counts and speeds -->
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-exclamation-triangle text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.harsh_braking_events') }}
            </label>
            <p class="font-semibold text-dark m-0 text-2xl">{{ analytics.drivingBehavior.harshBrakingCount || 0 }}</p>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-forward text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.rapid_acceleration_events') }}
            </label>
            <p class="font-semibold text-dark m-0 text-2xl">{{ analytics.drivingBehavior.rapidAccelerationCount || 0 }}</p>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-gauge text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.average_speed') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-2xl">{{ analytics.drivingBehavior.averageSpeed || 0 }}</p>
              <span class="text-sm text-color-secondary">{{ $t('vehicle_management.detail.analytics.driving_behavior.units.kmh') }}</span>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-bolt text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.max_speed_recorded') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-2xl">{{ analytics.drivingBehavior.maxSpeed || $t('common.na') }}</p>
              <span class="text-sm text-color-secondary" v-if="analytics.drivingBehavior.maxSpeed">{{ $t('vehicle_management.detail.analytics.driving_behavior.units.kmh') }}</span>
            </div>
          </div>
          
          <!-- Second row: Additional metrics -->
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-clock text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.total_drive_time') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.drivingBehavior.totalDriveTime || $t('common.na') }}</p>
              <span class="text-sm text-color-secondary" v-if="analytics.drivingBehavior.totalDriveTime">{{ $t('vehicle_management.detail.analytics.driving_behavior.units.hours') }}</span>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-percentage text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.idle_time_percentage') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.drivingBehavior.idleTimePercentage || $t('common.na') }}</p>
              <span class="text-sm text-color-secondary" v-if="analytics.drivingBehavior.idleTimePercentage">{{ $t('vehicle_management.detail.analytics.driving_behavior.units.percent') }}</span>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-map text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.eco_driving_score') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.drivingBehavior.ecoDrivingScore || $t('common.na') }}</p>
              <span class="text-sm text-color-secondary" v-if="analytics.drivingBehavior.ecoDrivingScore">{{ $t('vehicle_management.detail.analytics.driving_behavior.units.score') }}</span>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-trophy text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.driving_behavior.driver_score') }}
            </label>
            <pv-tag 
              :value="`${drivingBehaviorScore.score} ${$t('vehicle_management.detail.analytics.driving_behavior.driver_score').split(' ')[1] || ''}`" 
              :severity="drivingBehaviorScore.severity"
              class="mt-2 text-lg px-3 py-2"
            />
          </div>
        </div>
        <div v-else class="text-center py-4">
          <i class="pi pi-info-circle text-4xl text-400 mb-3"></i>
          <p class="text-600 text-lg m-0">{{ $t('vehicle_management.detail.analytics.driving_behavior.no_data') }}</p>
        </div>
      </template>
    </pv-card>

    <!-- ====================== Card -> Predictive Maintenance ====================== -->
    <pv-card class="w-full">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-cog" style="color: white;"></i>
          <span class="text-lg font-bold">{{ $t('vehicle_management.detail.analytics.predictive_maintenance.title') }}</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid">
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-exclamation-circle text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.predictive_maintenance.maintenance_risk_level') }}
            </label>
            <div class="flex align-items-center gap-3 mt-2">
              <span class="text-3xl font-bold text-primary">{{ getRiskPercentage(analytics.predictedMaintenanceRisk) }}{{ $t('vehicle_management.detail.analytics.predictive_maintenance.units.percent') }}</span>
            </div>
            <pv-progress-bar 
              :value="getRiskPercentage(analytics.predictedMaintenanceRisk)"
              class="mt-3"
              :class="maintenanceRiskLevel.severity === 'success' ? 'progress-success' : 
                     maintenanceRiskLevel.severity === 'warn' ? 'progress-warn' : 'progress-danger'"
            />
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-shield text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.predictive_maintenance.risk_classification') }}
            </label>
            <pv-tag 
              :value="`${maintenanceRiskLevel.level} ${$t('vehicle_management.detail.analytics.predictive_maintenance.risk_classification').split(' ')[1] || ''}`" 
              :severity="maintenanceRiskLevel.severity"
              class="mt-2 text-lg px-3 py-2"
            />
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-calendar-times text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.predictive_maintenance.next_service_due') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.nextServiceDue || 'TBD' }}</p>
              <span class="text-sm text-color-secondary" v-if="analytics.nextServiceDue">{{ $t('vehicle_management.detail.analytics.predictive_maintenance.units.days') }}</span>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-wrench text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.predictive_maintenance.maintenance_priority') }}
            </label>
            <pv-tag 
              :value="analytics.maintenancePriority === 'High' ? $t('vehicle_management.detail.analytics.predictive_maintenance.priorities.high') : 
                      analytics.maintenancePriority === 'Medium' ? $t('vehicle_management.detail.analytics.predictive_maintenance.priorities.medium') : 
                      $t('vehicle_management.detail.analytics.predictive_maintenance.priorities.normal')" 
              :severity="analytics.maintenancePriority === 'High' ? 'danger' : analytics.maintenancePriority === 'Medium' ? 'warn' : 'success'"
              class="mt-2 text-base px-3 py-2"
            />
          </div>
        </div>
      </template>
    </pv-card>

    <!-- ====================== Card -> System Status ====================== -->
    <pv-card class="w-full">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-desktop" style="color: white;"></i>
          <span class="text-lg font-bold">{{ $t('vehicle_management.detail.analytics.system_status.title') }}</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid">
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-download text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.system_status.software_updates') }}
            </label>
            <pv-tag 
              :value="analytics.softwareUpdateAvailable ? $t('vehicle_management.detail.analytics.system_status.update_available') : $t('vehicle_management.detail.analytics.system_status.up_to_date')" 
              :severity="analytics.softwareUpdateAvailable ? 'warn' : 'success'"
              :icon="analytics.softwareUpdateAvailable ? 'pi pi-exclamation-triangle' : 'pi pi-check-circle'"
              class="mt-2 text-base px-3 py-2"
            />
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-shield text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.system_status.system_health') }}
            </label>
            <div v-if="analytics.lastAnomalyDetected" class="mt-2">
              <pv-tag :value="analytics.lastAnomalyDetected.type || $t('vehicle_management.detail.analytics.system_status.anomaly_detected')" severity="warn" icon="pi pi-exclamation-triangle" class="text-base px-3 py-2" />
              <p class="text-xs text-500 mt-1 m-0">{{ formatDate(analytics.lastAnomalyDetected.date) }}</p>
            </div>
            <pv-tag v-else :value="$t('vehicle_management.detail.analytics.system_status.all_systems_normal')" severity="success" icon="pi pi-check-circle" class="mt-2 text-base px-3 py-2" />
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-database text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.system_status.data_quality_score') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-2xl">{{ analytics.dataQualityScore || 95 }}{{ $t('vehicle_management.detail.analytics.system_status.units.percent') }}</p>
            </div>
          </div>
          <div class="field col-12 md:col-3">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-sync text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.system_status.last_analysis') }}
            </label>
            <p class="font-semibold text-dark m-0">{{ 
              analytics.lastAnalysisDate ? formatDate(analytics.lastAnalysisDate) : 
             formatDate(analytics.createdAt) }}</p>
          </div>
        </div>
      </template>
    </pv-card>

    <!-- ====================== Card -> Additional Analytics Data ====================== -->
    <pv-card class="w-full" v-if="hasAdditionalData">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-chart-pie" style="color: white;"></i>
          <span class="text-lg font-bold">{{ $t('vehicle_management.detail.analytics.additional_analytics.title') }}</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid">
          <!-- Environmental Impact -->
          <div class="field col-12 md:col-3" v-if="analytics.co2Emissions !== undefined">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-globe text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.co2_emissions') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.co2Emissions }}</p>
              <span class="text-sm text-color-secondary">{{ $t('vehicle_management.detail.analytics.additional_analytics.units.kg_month') }}</span>
            </div>
          </div>
          
          <!-- Trip Analytics -->
          <div class="field col-12 md:col-3" v-if="analytics.averageTripDistance !== undefined">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-map text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.avg_trip_distance') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.averageTripDistance }}</p>
              <span class="text-sm text-color-secondary">{{ $t('vehicle_management.detail.analytics.additional_analytics.units.km') }}</span>
            </div>
          </div>
          
          <!-- Cost Analytics -->
          <div class="field col-12 md:col-3" v-if="analytics.estimatedFuelCost !== undefined">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-dollar text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.monthly_fuel_cost') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.estimatedFuelCost }}</p>
              <span class="text-sm text-color-secondary">{{ $t('vehicle_management.detail.analytics.additional_analytics.units.usd') }}</span>
            </div>
          </div>
          
          <!-- Performance Score -->
          <div class="field col-12 md:col-3" v-if="analytics.overallPerformanceScore !== undefined">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-star text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.performance_score') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-xl">{{ analytics.overallPerformanceScore }}</p>
              <span class="text-sm text-color-secondary">{{ $t('vehicle_management.detail.analytics.additional_analytics.units.score') }}</span>
            </div>
          </div>
          
          <!-- Historical data comparison -->
          <div class="field col-12 md:col-3" v-if="analytics.monthlyComparisonPercent !== undefined">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-chart-line text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.monthly_change') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold m-0 text-lg" 
                 :class="analytics.monthlyComparisonPercent > 0 ? 'text-green-600' : analytics.monthlyComparisonPercent < 0 ? 'text-red-600' : 'text-dark'">
                {{ analytics.monthlyComparisonPercent > 0 ? '+' : '' }}{{ analytics.monthlyComparisonPercent }}{{ $t('vehicle_management.detail.analytics.additional_analytics.units.percent') }}
              </p>
              <i :class="analytics.monthlyComparisonPercent > 0 ? 'pi pi-arrow-up text-green-500' : 
                         analytics.monthlyComparisonPercent < 0 ? 'pi pi-arrow-down text-red-500' : 
                         'pi pi-minus text-blue-500'"></i>
            </div>
          </div>
          
          <!-- Data completeness -->
          <div class="field col-12 md:col-3" v-if="analytics.dataCompletenessPercent !== undefined">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-percentage text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.data_completeness') }}
            </label>
            <div class="flex align-items-center gap-2">
              <p class="font-semibold text-dark m-0 text-lg">{{ analytics.dataCompletenessPercent }}{{ $t('vehicle_management.detail.analytics.additional_analytics.units.percent') }}</p>
            </div>
          </div>
          
          <!-- Analysis confidence -->
          <div class="field col-12 md:col-3" v-if="analytics.analysisConfidence !== undefined">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-verified text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.analysis_confidence') }}
            </label>
            <pv-tag 
              :value="analytics.analysisConfidence === 'High' ? $t('vehicle_management.detail.analytics.additional_analytics.confidence_levels.high') : 
                      analytics.analysisConfidence === 'Medium' ? $t('vehicle_management.detail.analytics.additional_analytics.confidence_levels.medium') : 
                      $t('vehicle_management.detail.analytics.additional_analytics.confidence_levels.low')" 
              :severity="analytics.analysisConfidence === 'High' ? 'success' : 
                         analytics.analysisConfidence === 'Medium' ? 'info' : 'warn'"
              class="mt-1"
            />
          </div>
          
          <!-- Metadata information -->
          <div class="field col-12 md:col-3" v-if="analytics.dataSource">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-server text-primary"></i>
              {{ $t('vehicle_management.detail.analytics.additional_analytics.data_source') }}
            </label>
            <p class="font-semibold text-dark m-0">{{ analytics.dataSource }}</p>
          </div>
        </div>
      </template>
    </pv-card>

  </div>

  <!-- No analytics data message -->
  <div v-else class="flex flex-column align-items-center justify-content-center py-8">
    <i class="pi pi-chart-line text-6xl text-400 mb-4"></i>
    <h3 class="text-600 text-xl m-0 mb-2">{{ $t('vehicle_management.detail.analytics.no_data') }}</h3>
    <p class="text-500 text-center m-0">{{ $t('vehicle_management.detail.analytics.no_data_message') }}</p>
  </div>
</template>

<style scoped>
/* Minimal styles following appointment cards pattern */
:deep(.p-card-content) {
  padding: 0.5rem;
}

/* Header styling consistent with appointment cards */
:deep(.p-card .p-card-header) {
  background-color: #4A60D0 !important;
  color: white !important;
  border-top-left-radius: var(--border-radius) !important;
  border-top-right-radius: var(--border-radius) !important;
  padding: 0 !important;
  border-bottom: none !important;
}

:deep(.p-card) {
  border-radius: var(--border-radius) !important;
  overflow: hidden !important;
}

/* Progress bar color variants using PrimeFlex utility approach */
:deep(.progress-success .p-progressbar-value) {
  background: var(--green-500) !important;
}

:deep(.progress-warn .p-progressbar-value) {
  background: var(--yellow-500) !important;
}

:deep(.progress-danger .p-progressbar-value) {
  background: var(--red-500) !important;
}

/* Color classes for trend indicators */
.text-green-500 {
  color: #10B981 !important;
}

.text-green-600 {
  color: #059669 !important;
}

.text-red-500 {
  color: #EF4444 !important;
}

.text-red-600 {
  color: #DC2626 !important;
}

.text-blue-500 {
  color: #3B82F6 !important;
}

/* Hover animations for interactive elements */
:deep(.p-tag:hover) {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

:deep(.p-tag:active) {
  transform: translateY(0);
}
</style>