# Post Analysis Challenge

## Dependencies
- **axios v1.2.0**: fetching posts through asynchronous http requests
- **vue-sorted-table v1.3.0**: provides a custom table for sorting columns
- **vue-apexcharts v1.6.2**: includes a wide range of different charts that match perfectly with the purpose of this project
- **vue-html2pdf v1.8.0**: report PDF generation and export

## Data management
The post data is stored and managed from a **Vuex store module** which allows the page to to fetch posts to the API and use the data across the different components.
