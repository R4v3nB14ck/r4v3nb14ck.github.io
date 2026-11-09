<?php
/* =====================================================
   R4v3nB14ck · Portfolio
   Edit ONLY this section to change links, texts and ads.
   ===================================================== */
$site = [
  'name'  => 'R4v3nB14ck',
  'title'  => 'Modder · Game Developer · Software Creator',
  'tagline'    => 'Creating mods, games and applications.',
];

// Featured projects (each links to its own website)
$projects = [
  ['icon'=>'sword','name'=>'Alternis','type'=>'Video Game',
   'text'=>'A game built from scratch. Learn about its world, features and progress on the official project website.',
   'url'=>'https://sites.google.com/view/alternis-project/home'],
  ['icon'=>'pin','name'=>'Minimap-irl','type'=>'Application',
   'text'=>'An application that brings the video game minimap into the real world. See how it works on the official project website.',
   'url'=>'https://sites.google.com/view/minimap-irl/home'],
];

// Mods  ->  CHANGE these URLs to your real profiles
$mods = [
  ['icon'=>'nexus','name'=>'Nexus Mods','text'=>'My published mods for a variety of games.','url'=>'https://www.nexusmods.com/'],
  ['icon'=>'gta','name'=>'GTA5-Mods','text'=>'Mods and content for Grand Theft Auto V.','url'=>'https://www.gta5-mods.com/'],
  ['icon'=>'steam','name'=>'Steam Workshop','text'=>'Items and content shared with the Steam community.','url'=>'https://steamcommunity.com/'],
];

// Platforms  ->  CHANGE these URLs to your real profiles
$platforms = [
  ['icon'=>'youtube','name'=>'YouTube','text'=>'Videos, previews and project updates.','url'=>'https://www.youtube.com/'],
  ['icon'=>'itch','name'=>'itch.io','text'=>'Games and prototypes published on itch.io.','url'=>'https://itch.io/'],
];

// Ads: paste your ad code here (AdSense, etc.). Empty = a placeholder is shown.
$ads = ['top'=>'', 'middle'=>'', 'bottom'=>''];

/* ---------- helpers ---------- */
function e($s){ return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
function icon($n){
  $p = [
    'nexus'  => '<path d="M5 20V4l14 16V4"/>',
    'gta'    => '<path d="M17 4H8v7h6.5a3.5 3.5 0 010 7H6"/>',
    'steam'  => '<circle cx="16" cy="8" r="4"/><circle cx="8" cy="16" r="3.2"/><path d="M10.4 13.6l3-3"/>',
    'youtube'=> '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
    'itch'   => '<path d="M4 9l2-5h12l2 5a2.5 2.5 0 01-5 0 2.5 2.5 0 01-5 0 2.5 2.5 0 01-5 0z"/><path d="M5.5 12.5V20h13v-7.5"/><path d="M10 20v-4h4v4"/>',
    'sword'  => '<path d="M4 4l16 16M20 4L4 20M2.5 7.5l5-5M16.5 21.5l5-5M21.5 7.5l-5-5M7.5 21.5l-5-5"/>',
    'pin'    => '<path d="M12 21s7-6.2 7-11.2a7 7 0 10-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="10" r="2.5"/>',
    'scroll' => '<path d="M8 4h10v13a3 3 0 01-3 3H6a3 3 0 003-3V4zM8 4a2 2 0 00-2 2v1h2"/><path d="M12 9h3M12 13h3"/>',
  ];
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'.($p[$n] ?? '').'</svg>';
}
function render_ad($ads,$k,$cls){
  echo '<aside class="ad '.$cls.'" aria-label="Advertisement"><span class="ad-tag">Advertisement</span>';
  echo $ads[$k] !== '' ? $ads[$k] : '<span class="ad-ph">Ad space</span>';
  echo '</aside>';
}
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($site['name']) ?> · Portfolio</title>
<meta name="description" content="<?= e($site['name'].' — '.$site['title']) ?>">
<meta name="theme-color" content="#0a0a0c">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;600&family=UnifrakturCook:wght@700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<canvas id="embers"></canvas>

<nav><div class="wrap">
  <b><?= e($site['name']) ?></b>
  <ul>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#mods">Mods</a></li>
    <li><a href="#platforms">Platforms</a></li>
  </ul>
</div></nav>

<header class="hero"><div class="wrap">
  <div class="emblem">
    <svg viewBox="0 0 300 300" role="img" aria-label="Emblem of <?= e($site['name']) ?>">
      <defs><path id="circ" d="M150 150m-128 0a128 128 0 1 1 256 0a128 128 0 1 1-256 0"/></defs>
      <g class="ring"><text><textPath href="#circ">· MODDER · GAME DEVELOPER · SOFTWARE CREATOR · CONTENT CREATOR </textPath></text></g>
      <circle class="stroke" cx="150" cy="150" r="108"/>
      <path class="stroke" d="M150 70l52 18v50c0 36-24 58-52 72-28-14-52-36-52-72V88z"/>
      <path class="raven" d="M122 178c-6-26 6-52 30-58l30-12-14 20c8 14 4 36-14 52l-8 22-4-24c-12-2-18-0-20 0z"/>
      <circle class="raven" cx="168" cy="130" r="3" fill="#0a0a0c"/>
    </svg>
  </div>
  <h1><?= e($site['name']) ?></h1>
  <p class="role"><?= e($site['title']) ?></p>
  <p class="tagline"><?= e($site['tagline']) ?></p>
  <div class="actions">
    <a class="btn primary" href="#projects">View projects</a>
    <a class="btn" href="#mods">View mods</a>
  </div>
</div></header>

<main class="wrap">
  <?php render_ad($ads,'top','rev compact'); ?>

  <section id="projects">
    <div class="div rev"><i></i><h2>Featured Projects</h2><i></i></div>
    <p class="sub rev">My two main projects, each with its own website.</p>
    <div class="banners">
      <?php foreach($projects as $o): ?>
      <article class="banner rev">
        <div class="ico"><?= icon($o['icon']) ?></div>
        <small><?= e($o['type']) ?></small>
        <h3><?= e($o['name']) ?></h3>
        <p><?= e($o['text']) ?></p>
        <a class="btn" href="<?= e($o['url']) ?>" target="_blank" rel="noopener"><?= icon('scroll') ?>Visit website</a>
      </article>
      <?php endforeach; ?>
    </div>
  </section>

  <?php render_ad($ads,'middle','rev compact'); ?>

  <section id="mods">
    <div class="div rev"><i></i><h2>Mods</h2><i></i></div>
    <div class="cards">
      <?php foreach($mods as $m): ?>
      <a class="card rev" href="<?= e($m['url']) ?>" target="_blank" rel="noopener">
        <span class="ico"><?= icon($m['icon']) ?></span>
        <span><h3><?= e($m['name']) ?></h3><p><?= e($m['text']) ?></p></span>
      </a>
      <?php endforeach; ?>
    </div>
  </section>

  <section id="platforms">
    <div class="div rev"><i></i><h2>Channels &amp; Platforms</h2><i></i></div>
    <div class="cards">
      <?php foreach($platforms as $m): ?>
      <a class="card rev" href="<?= e($m['url']) ?>" target="_blank" rel="noopener">
        <span class="ico"><?= icon($m['icon']) ?></span>
        <span><h3><?= e($m['name']) ?></h3><p><?= e($m['text']) ?></p></span>
      </a>
      <?php endforeach; ?>
    </div>
  </section>
</main>

<footer><div class="wrap">
  <?php render_ad($ads,'bottom','compact'); ?>
  <div class="div"><i></i><i></i><i></i></div>
  <p>© <?= date('Y') ?> <?= e($site['name']) ?> · All rights reserved</p>
</div></footer>

<script src="js/main.js" defer></script>
</body>
</html>
