export function generateAsyncTag(zoneId: number) {
    return `
  <ins data-revive-zoneid="${zoneId}"
       data-revive-id="f97d78385bbae9ae9558b3cb5dc5604d"></ins>
  <script async src="http://localhost:8080/www/delivery/asyncjs.php"></script>
  `.trim();
  }
  