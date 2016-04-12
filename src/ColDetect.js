var checkPlayerEnemyCollision = function(player, enemy) {
  if(collisionCondition(player, enemy))
    return true;
  else
    return false;
};

var collisionCondition = function(player, enemy) {
  return Math.abs(player.x - enemy.x) <= playerAndEnemyDistanceX &&
  Math.abs(player.y - enemy.y) <= playerAndEnemyDistanceY;
}
var playerAndEnemyDistanceX = 85;
var playerAndEnemyDistanceY = 140;
var EnemyAndBulletDistanceX = 0000000;
var EnemyAndBulletDistanceY = 0000000;
