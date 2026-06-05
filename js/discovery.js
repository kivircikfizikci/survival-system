const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");

function movePlayerTo(x, y) {
  if (!canMoveTo(x, y)) {
    return;
  }

  discoveryState.x = x;
  discoveryState.y = y;

  markCurrentTileVisited();

  saveDiscoveryState();
  renderDiscoveryMap();
}
function setDiscoveryZoom(newZoom) {
 const minZoom = 0.5;
 const maxZoom = 1.5;

  discoveryState.zoom = Math.max(
    minZoom,
    Math.min(maxZoom, newZoom)
  );

  saveDiscoveryState();
  renderDiscoveryMap();
}

zoomInButton.addEventListener("click", function () {
  setDiscoveryZoom(discoveryState.zoom + 0.15);
});

zoomOutButton.addEventListener("click", function () {
  setDiscoveryZoom(discoveryState.zoom - 0.15);
});

window.addEventListener("resize", function () {
  requestAnimationFrame(function () {
    updateMapCamera();
  });
});

loadDiscoveryState();
renderDiscoveryMap();