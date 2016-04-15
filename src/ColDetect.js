var checkPlayerEnemyCollision = function(player, enemy) {
  if(playerEnemyCollisionCondition(player, enemy))
    return true;
  else
    return false;
};

var checkBulletEnemyCollision = function(bullet, enemy) {
  if(bulletEnemyCollisionCondition(bullet, enemy))
    return true;
  else
    return false;
};

var playerEnemyCollisionCondition = function(player, enemy) {
  return Math.abs(player.x - enemy.x) <= playerAndEnemyDistanceX &&
  Math.abs(player.y - enemy.y) <= playerAndEnemyDistanceY;
};

var bulletEnemyCollisionCondition = function(bullet, enemy) {
  if(bullet.y >= bulletMaxY)
    return false;
  return Math.abs(bullet.x - enemy.x) <= enemyAndBulletDistanceX &&
  Math.abs(bullet.y - enemy.y) <= enemyAndBulletDistanceY && bullet.y < GameLayer.SCREENHEIGHT + bulletRadiusY;
};

var playerAndEnemyDistanceX = 85;
var playerAndEnemyDistanceY = 140;
var enemyAndBulletDistanceX = 65;
var enemyAndBulletDistanceY = 75;
var bulletRadiusY = 25;
var bulletMaxY = 1200;
