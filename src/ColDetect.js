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

var checkPlayerBonusItemCollision = function(player, bonusItem) {
  if(playerBonusItemCollisionCondition(player, bonusItem))
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
  Math.abs(bullet.y - enemy.y) <= enemyAndBulletDistanceY && bullet.y < GameLayer.SCREENHEIGHT - bulletRadiusY;
};

var playerBonusItemCollisionCondition = function(player, bonusItem) {
  return Math.abs(player.x - bonusItem.x) <= playerAndBonusItemDistanceX &&
  Math.abs(player.y - bonusItem.y) <= playerAndBonusItemDistanceY && bonusItem.y > screenBottom;
};

var playerAndEnemyDistanceX = 85;
var playerAndEnemyDistanceY = 140;
var enemyAndBulletDistanceX = 70;
var enemyAndBulletDistanceY = 80;
var playerAndBonusItemDistanceX = 100;
var playerAndBonusItemDistanceY = 140;
var screenBottom = 0;
var bulletRadiusY = 25;
var bulletMaxY = 1200;
