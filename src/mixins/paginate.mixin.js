import _ from "lodash";

export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    pageSize: 5,
    allItems: [],
    items: []
  }),
  methods: {
    setupPage(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    clickHandle(page) {
      this.items = this.allItems[page - 1] || this.allItems[0];
    }
  }
};
