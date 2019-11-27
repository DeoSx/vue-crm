<template>
  <div class="row">
    <CreateCategory @created="addNewCategory" />

    <EditCategory
      :categories="categories"
      :key="categories.length + updateCount"
      @updated="updateCategories"
    />
  </div>
</template>

<script>
import CreateCategory from "@/components/CreateCategory";
import EditCategory from "@/components/EditCategory";

export default {
  metaInfo: {
    title: "Создать статью"
  },
  name: "create",
  data: () => ({
    categories: [],
    updateCount: 0,
    title: ""
  }),
  components: {
    CreateCategory,
    EditCategory
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      this.updateCount++;
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].type = category.type;
      this.updateCount++;
    }
  }
};
</script>

<style lang="scss">
</style>