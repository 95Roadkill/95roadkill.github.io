var StatusText = document.getElementById('statustext');
var StatusFiles = document.getElementById('statusfiles');

(function () {
    'use strict';

    var LOAD = {};
    LOAD.init = function () {
        this.progress = 0.0;
        this.filesNeeded = 1;
        this.filesTotal = 1;

        this.$ = {};
        // loading bar
        this.updateProgress();
    };
    LOAD.updateProgress = function () {
        var filesRemaining = Math.max(0, this.filesTotal - this.filesNeeded),
            progress = (this.filesTotal > 0) ?
                (filesRemaining / this.filesTotal) : 1;

        progress = Math.round(progress * 100);
        StatusFiles.innerText = progress + "%"
    };
    LOAD.setFilesTotal = function (numFiles) {
        this.filesTotal = Math.max(0, numFiles);
    };
    LOAD.setFilesNeeded = function (numFiles) {
        this.filesNeeded = Math.max(0, numFiles);
    };
    LOAD.onFileDownloading = function (filePath) {
        this.filesNeeded = Math.max(0, this.filesNeeded - 1);
        this.updateProgress();

        var status = 'Downloading ' + filePath + '...';
        this.onStatusChanged(status);
    };
    LOAD.onStatusChanged = function (status) {
        // final status
        if (status === 'Sending client info...') {
            this.filesNeeded = 0;
            StatusFiles.innerText = ""
        }
        StatusText.innerText = status;
    };

    window.DownloadingFile = function (filePath) {
        LOAD.onFileDownloading(filePath);
    };
    window.SetStatusChanged = function (status) {
        LOAD.onStatusChanged(status);
    };
    window.SetFilesTotal = function (total) {
        LOAD.setFilesTotal(total);
    };
    window.SetFilesNeeded = function (needed) {
        LOAD.setFilesNeeded(needed);
    };
    StatusText.innerText = "Connecting..."
}());

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var titles = [
    "Food heals more slowly than stimpaks, but is more common in the Mojave Wasteland. The Survival skill can increase the healing benefits of all forms of food, including campfire crafting recipes.",
    "Once your weapons and armor reach a certain condition level, your Repair skill can be used to maintain them, keeping them at maximum power for longer.",
    "The Energy Weapons skill determines your effectiveness with any weapon that uses energy cells, microfusion cells, electron charge packs, microfusion breeder, or flamer fuel as ammunition.",
    "Explosive weapons are best used when dealing with crowds or in situations where precision is not a high priority.",
    "Damage Threshold is subtracted directly from the DAM a weapon does. If DT is higher than the DAM of a weapon, very little damage gets through.",
    "If you see a shield next to your health HUD, it means that your Damage Threshold is absorbing an enemy weapon's damage. A broken shield means they have completely negated your Damage Threshold.",
    "If you see a red shield next to an enemy's health, it means that their armor's Damage Threshold is absorbing your weapon's damage. A broken red shield means you have completely negated their Damage Threshold.",
    "If your weapons aren't strong enough to penetrate an enemy's armor, use armor piercing ammunition, attack from stealth, or use a weapon with higher DMG!",
    "The NCR's military doesn't like being in the role of 'peace-keeper'. Crimes across the Mojave are typically punished by death.",
    "Despite the best efforts of well-equipped hunters, deathclaws continue to establish nests across the Mojave Wasteland.",
    "Feral ghouls have lost the ability to reason, and will attack any human on sight.",
    "The Nightkin are Super Mutants, stealth troops created by the Master. They scattered across the wasteland after his defeat, taking refuge in remote locations.",
    "Super Mutants in the Mojave Wasteland are remnants of the Master's Army and the Enclave's experiments at Mariposa Military Base.",
    "With the Educated perk, you gain two more skill points every time you advance in level.",
    "With the Intense Training perk. You can put a single point into any of your S.P.E.C.I.A.L. attributes.",
    "Rad Resistance allows you to—what else? -- resist Radiation. This perk grants an additional 25% to Radiation Resistance.",
    "At workbenches, the Science skill can help you recycle Energy Weapon ammunition and craft other useful items like stimpaks.",
    "Whether you're good, bad, or somewhere in between, all major communities and organizations in the Mojave wasteland will pay attention to your reputation.",
    "You can restore Health by using a Stimpak, eating food pr drinking from a water source.",
    "Most energy weapons fall into one of two categories: laser, which is fast, accurate, and low damage; and Plasma, which is slow-moving and very high damage.",
    "The Followers of the Apocalypse are an organization with roots in the pre-NCR Boneyard. Dedicated to teaching the poor and healing the sick, they are also considered anarchist revolutionaries by many people in positions of power.",
    "Due to disagreements over how technology should be controlled in the wasteland, the Brotherhood of Steel waged a long and bloody war against the NCR. Despite superior equipment and training, the Brotherhood went into retreat.",
    "Though their power in the west has diminished greatly over the years, the Brotherhood of Steel still maintains hidden, heavily fortified bunkers throughout the Mojave.",
    "Though they were a powerful force in the west decades ago, the Enclave has not been seen or heard from in the Mojave Wasteland for years.",
    "At the Battle of Hoover Dam, the tide turned for the NCR when Rangers and 1st Recon sharpshooters lured Caesar's soldier into the booby-trapped ruins of Boulder City.",
];
var CounterNum = getRandomInt(titles.length);

function Counter(elem, delay) {
	var interval;
    
    elem.innerText = titles[CounterNum];

	function updateDisplay(value) {
	    elem.innerText = value;
	}

	function run() {
	    CounterNum += 1;
	    if (CounterNum == titles.length) CounterNum = 0;

	    updateDisplay(titles[CounterNum]);
	}

	function start() {
	    interval = window.setInterval(run, delay);
	}
	this.start = start;
}

var elem = document.getElementById("toptext");
var counter = new Counter(elem, 10000);
counter.start();