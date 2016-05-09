var checkPlayerEnemyCollision = function(player, enemy) {
  return Math.abs(player.x - enemy.x) <= playerAndEnemyDistanceX &&
    Math.abs(player.y - enemy.y) <= playerAndEnemyDistanceY;
};

var checkBulletEnemyCollision = function(bullet, enemy) {
  if (bullet.y >= bulletMaxY)
    return false;

  return Math.abs(bullet.x - enemy.x) <= enemyAndBulletDistanceX &&
    Math.abs(bullet.y - enemy.y) <= enemyAndBulletDistanceY &&
    bullet.y < GameLayer.SCREENHEIGHT - bulletRadiusY;
};

var checkPlayerBonusItemCollision = function(player, bonusItem) {
  return Math.abs(player.x - bonusItem.x) <= playerAndBonusItemDistanceX &&
    Math.abs(player.y - bonusItem.y) <= playerAndBonusItemDistanceY &&
    bonusItem.y > screenBottom;
};

var checkHitBulletAndPlayer = function(enemyBullet, player) {
  return Math.abs(player.x - enemyBullet.x) <= playerAndBonusItemDistanceX &&
    Math.abs(player.y - enemyBullet.y) <= playerAndBonusItemDistanceY &&
    enemyBullet.y > screenBottom;
}

var playerAndEnemyDistanceX = 85;
var playerAndEnemyDistanceY = 140;

var enemyAndBulletDistanceX = 70;
var enemyAndBulletDistanceY = 80;

var playerAndBonusItemDistanceX = 105;
var playerAndBonusItemDistanceY = 145;

var playerAndEnemyBulletDistanceX = 95;
var playerAndEnemyBulletDistanceY = 140;

var screenBottom = 0;

var bulletRadiusY = 25;
var bulletMaxY = 1200;
