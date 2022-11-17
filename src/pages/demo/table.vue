<script lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '~~/services/CustomerService';
import ProductService from '~~/services/ProductService';

export default {
  data() {
    return {
      customer1: null,
      customer2: null,
      customer3: null,
      filters1: null,
      filters2: {},
      loading1: true,
      loading2: true,
      idFrozen: false,
      products: null,
      expandedRows: [],
      statuses: [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
      ],
      representatives: [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
      ]
    };
  },
  customerService: null,
  productService: null,
  created() {
    this.customerService = new CustomerService();
    this.productService = new ProductService();
    this.initFilters1();
  },
  mounted() {
    this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
    this.customerService.getCustomersLarge().then((data) => {
      this.customer1 = data;
      this.loading1 = false;
      this.customer1.forEach(customer => customer.date = new Date(customer.date));
    });
    this.customerService.getCustomersLarge().then(data => this.customer2 = data);
    this.customerService.getCustomersMedium().then(data => this.customer3 = data);
    this.loading2 = false;
  },
  methods: {
    initFilters1() {
      this.filters1 = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
      };
    },
    clearFilter1() {
      this.initFilters1();
    },
    expandAll() {
      this.expandedRows = this.products.filter(p => p.id);
    },
    collapseAll() {
      this.expandedRows = null;
    },
    formatCurrency(value) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    formatDate(value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    calculateCustomerTotal(name) {
      let total = 0;
      if (this.customer3) {
        for (const customer of this.customer3) {
          if (customer.representative.name === name) {
            total++;
          }
        }
      }

      return total;
    }
  }
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Filter Menu</h5>
        <DataTable
          v-model:filters="filters1"
          :value="customer1"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          data-key="id"
          :row-hover="true"
          filter-display="menu"
          :loading="loading1"
          :filters="filters1"
          responsive-layout="scroll"
          :global-filter-fields="['name', 'country.name', 'representative.name', 'balance', 'status']"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button" icon="pi pi-filter-slash" label="Clear"
                class="p-button-outlined mb-2"
                @click="clearFilter1()"
              />
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText v-model="filters1.global.value" placeholder="Keyword Search" style="width: 100%" />
              </span>
            </div>
          </template>
          <template #empty>
            No customers found.
          </template>
          <template #loading>
            Loading customers data. Please wait.
          </template>
          <Column field="name" header="Name" style="min-width:12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
            </template>
          </Column>
          <Column header="Country" filter-field="country.name" style="min-width:12rem">
            <template #body="{ data }">
              <img src="~/assets/demo/flags/flag_placeholder.png" :alt="data.country.name" :class="`flag flag-${data.country.code}`" width="30">
              <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{ data.country.name }}</span>
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
            </template>
            <template #filterclear="{ filterCallback }">
              <Button type="button" icon="pi pi-times" class="p-button-secondary" @click="filterCallback()" />
            </template>
            <template #filterapply="{ filterCallback }">
              <Button type="button" icon="pi pi-check" class="p-button-success" @click="filterCallback()" />
            </template>
          </Column>
          <Column
            header="Agent" filter-field="representative" :show-filter-match-modes="false"
            :filter-menu-style="{ width: '14rem' }"
            style="min-width:14rem"
          >
            <template #body="{ data }">
              <img :alt="data.representative.name" :src="`/images/avatar/${data.representative.image}`" width="32" style="vertical-align: middle">
              <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{ data.representative.name }}</span>
            </template>
            <template #filter="{ filterModel }">
              <div class="mb-3 text-bold">
                Agent Picker
              </div>
              <ClientOnly>
                <MultiSelect
                  v-model="filterModel.value" :options="representatives" option-label="name"
                  placeholder="Any"
                  class="p-column-filter"
                >
                  <template #option="slotProps">
                    <div class="p-multiselect-representative-option">
                      <img :alt="slotProps.option.name" :src="`/images/avatar/${slotProps.option.image}`" width="32" style="vertical-align: middle">
                      <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{ slotProps.option.name }}</span>
                    </div>
                  </template>
                </MultiSelect>
              </ClientOnly>
            </template>
          </Column>
          <Column header="Date" filter-field="date" data-type="date" style="min-width:10rem">
            <template #body="{ data }">
              {{ formatDate(data.date) }}
            </template>
            <template #filter="{ filterModel }">
              <ClientOnly>
                <Calendar v-model="filterModel.value" date-format="mm/dd/yy" placeholder="mm/dd/yyyy" />
              </ClientOnly>
            </template>
          </Column>
          <Column header="Balance" filter-field="balance" data-type="numeric" style="min-width:10rem">
            <template #body="{ data }">
              {{ formatCurrency(data.balance) }}
            </template>
            <template #filter="{ filterModel }">
              <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
            </template>
          </Column>
          <Column field="status" header="Status" :filter-menu-style="{ width: '14rem' }" style="min-width:12rem">
            <template #body="{ data }">
              <span :class="`customer-badge status-${data.status}`">{{ data.status }}</span>
            </template>
            <template #filter="{ filterModel }">
              <ClientOnly>
                <Dropdown
                  v-model="filterModel.value" :options="statuses" placeholder="Any"
                  class="p-column-filter"
                  :show-clear="true"
                >
                  <template #value="slotProps">
                    <span v-if="slotProps.value" :class="`customer-badge status-${slotProps.value}`">{{ slotProps.value }}</span>
                    <span v-else>{{ slotProps.placeholder }}</span>
                  </template>
                  <template #option="slotProps">
                    <span :class="`customer-badge status-${slotProps.option}`">{{ slotProps.option }}</span>
                  </template>
                </Dropdown>
              </ClientOnly>
            </template>
          </Column>
          <Column field="activity" header="Activity" :show-filter-match-modes="false" style="min-width:12rem">
            <template #body="{ data }">
              <ProgressBar :value="data.activity" :show-value="false" style="height:.5rem" />
            </template>
            <template #filter="{ filterModel }">
              <Slider v-model="filterModel.value" range class="m-3" />
              <div class="flex align-items-center justify-content-between px-2">
                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
              </div>
            </template>
          </Column>
          <Column
            field="verified" header="Verified" data-type="boolean"
            body-class="text-center"
            style="min-width:8rem"
          >
            <template #body="{ data }">
              <i class="pi" :class="{ 'text-green-500 pi-check-circle': data.verified, 'text-pink-500 pi-times-circle': !data.verified }" />
            </template>
            <template #filter="{ filterModel }">
              <TriStateCheckbox v-model="filterModel.value" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Frozen Columns</h5>
        <ToggleButton
          v-model="idFrozen"
          on-icon="pi pi-lock"
          off-icon="pi pi-lock-open"
          on-label="Unfreeze Id"
          off-label="Freeze Id"
          style="width: 10rem"
        />

        <DataTable
          :value="customer2"
          :scrollable="true"
          scroll-height="400px"
          :loading="loading2"
          scroll-direction="both"
          class="mt-3"
        >
          <Column field="name" header="Name" :style="{ width: '150px' }" frozen />
          <Column field="id" header="Id" :style="{ width: '100px' }" :frozen="idFrozen" />
          <Column field="name" header="Name" :style="{ width: '200px' }" />
          <Column field="country.name" header="Country" :style="{ width: '200px' }">
            <template #body="{ data }">
              <img src="~/assets/demo/flags/flag_placeholder.png" :class="`flag flag-${data.country.code}`" width="30">
              <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{ data.country.name }}</span>
            </template>
          </Column>
          <Column field="date" header="Date" :style="{ width: '200px' }" />
          <Column field="company" header="Company" :style="{ width: '200px' }" />
          <Column field="status" header="Status" :style="{ width: '200px' }">
            <template #body="{ data }">
              <span :class="`customer-badge status-${data.status}`">{{ data.status }}</span>
            </template>
          </Column>
          <Column field="activity" header="Activity" :style="{ width: '200px' }" />
          <Column field="representative.name" header="Representative" :style="{ width: '200px' }">
            <template #body="{ data }">
              <img :alt="data.representative.name" :src="`/images/avatar/${data.representative.image}`" width="32" style="vertical-align: middle">
              <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{ data.representative.name }}</span>
            </template>
          </Column>
          <Column
            field="balance" header="Balance" :style="{ width: '150px' }"
            frozen
            align-frozen="right"
          >
            <template #body="{ data }">
              <span class="text-bold">{{ formatCurrency(data.balance) }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Row Expand</h5>
        <DataTable v-model:expandedRows="expandedRows" :value="products" data-key="id" responsive-layout="scroll">
          <template #header>
            <div>
              <Button icon="pi pi-plus" label="Expand All" class="mr-2 mb-2" @click="expandAll" />
              <Button icon="pi pi-minus" label="Collapse All" class="mb-2" @click="collapseAll" />
            </div>
          </template>
          <Column :expander="true" header-style="width: 3rem" />
          <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <img :src="`/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="shadow-2" width="100">
            </template>
          </Column>
          <Column field="price" header="Price" :sortable="true">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="category" header="Category" :sortable="true">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.category) }}
            </template>
          </Column>
          <Column field="rating" header="Reviews" :sortable="true">
            <template #body="slotProps">
              <Rating :model-value="slotProps.data.rating" :readonly="true" :cancel="false" />
            </template>
          </Column>
          <Column field="inventoryStatus" header="Status" :sortable="true">
            <template #body="slotProps">
              <span :class="`product-badge status-${slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : ''}`">{{ slotProps.data.inventoryStatus }}</span>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Orders for {{ slotProps.data.name }}</h5>
              <DataTable :value="slotProps.data.orders" responsive-layout="scroll">
                <Column field="id" header="Id" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.id }}
                  </template>
                </Column>
                <Column field="customer" header="Customer" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.customer }}
                  </template>
                </Column>
                <Column field="date" header="Date" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.date }}
                  </template>
                </Column>
                <Column field="amount" header="Amount" :sortable="true">
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.amount) }}
                  </template>
                </Column>
                <Column field="status" header="Status" :sortable="true">
                  <template #body="slotProps">
                    <span :class="`order-badge order-${slotProps.data.status ? slotProps.data.status.toLowerCase() : ''}`">{{ slotProps.data.status }}</span>
                  </template>
                </Column>
                <Column header-style="width:4rem">
                  <template #body>
                    <Button icon="pi pi-search" />
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Subheader Grouping</h5>
        <DataTable
          :value="customer3"
          row-group-mode="subheader"
          group-rows-by="representative.name"
          sort-mode="single"
          sort-field="representative.name"
          :sort-order="1"
          scrollable
          scroll-height="400px"
        >
          <Column field="representative.name" header="Representative" />
          <Column field="name" header="Name" style="min-width:200px" />
          <Column field="country" header="Country" style="min-width:200px">
            <template #body="slotProps">
              <img src="~/assets/demo/flags/flag_placeholder.png" :class="`flag flag-${slotProps.data.country.code}`" width="30">
              <span class="image-text ml-2">{{ slotProps.data.country.name }}</span>
            </template>
          </Column>
          <Column field="company" header="Company" style="min-width:200px" />
          <Column field="status" header="Status" style="min-width:200px">
            <template #body="slotProps">
              <span :class="`customer-badge status-${slotProps.data.status}`">{{ slotProps.data.status }}</span>
            </template>
          </Column>
          <Column field="date" header="Date" style="min-width:200px" />
          <template #groupheader="slotProps">
            <img :alt="slotProps.data.representative.name" :src="`/images/avatar/${slotProps.data.representative.image}`" width="32" style="vertical-align: middle">
            <span class="image-text">{{ slotProps.data.representative.name }}</span>
          </template>
          <template #groupfooter="slotProps">
            <td style="text-align: right" class="text-bold pr-6">
              Total Customers: {{ calculateCustomerTotal(slotProps.data.representative.name) }}
            </td>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
	.customer-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-qualified {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-unqualified {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-negotiation {
			background: #FEEDAF;
			color: #8A5340;
		}

		&.status-new {
			background: #B3E5FC;
			color: #23547B;
		}

		&.status-renewal {
			background: #ECCFFF;
			color: #694382;
		}

		&.status-proposal {
			background: #FFD8B2;
			color: #805B36;
		}
	}

	.product-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-instock {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-outofstock {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-lowstock {
			background: #FEEDAF;
			color: #8A5340;
		}
	}

	.order-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.order-delivered {
			background: #C8E6C9;
			color: #256029;
		}

		&.order-cancelled {
			background: #FFCDD2;
			color: #C63737;
		}

		&.order-pending {
			background: #FEEDAF;
			color: #8A5340;
		}

		&.order-returned {
			background: #ECCFFF;
			color: #694382;
		}
	}
</style>
