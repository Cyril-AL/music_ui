<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {},
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import "@/uni_modules/uview-plus/index.scss";
/*每个页面公共css */
page {
  background-color: #101619;
}
</style>
