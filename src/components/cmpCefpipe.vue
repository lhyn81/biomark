<script>
  export default
  {
    mounted () {
      (async function()
          {
            await CefSharp.BindObjectAsync("CefPipe");
            CefPipe.cefInit();
      })();
    }
  }
</script>