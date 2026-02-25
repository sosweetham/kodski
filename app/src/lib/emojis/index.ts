/** Shared emoji index used by hiBanners and mdsvex emoji preprocessor */
export const emojiFiles = [
	'Chika-lenny.gif',
	'chikaaaah.gif',
	'happyanimegirl.gif',
	'earperk.gif',
	'jumpingblob.gif',
	'kannawant.png',
	'Hehe.png',
	'confuseddog.gif',
	'kannaspook.png',
	'sla.png',
	'smugspongebob.png',
	'thonkspin.gif',
	'monkashoot.gif',
	'happypikachu.png',
	'pikahi.gif',
	'emoji_anime.gif',
	'mashahello.png',
	'meguwat.png',
	'emoji.jpeg',
	'GoodMorning.png',
	'pepehmm.png',
	'Wow.gif',
	'kekw.png',
	'lolithumb.png',
	'anime.gif',
	'pepeevilthink.png',
	'zerotwo_hype.gif',
	'megublush.png',
	'Angry.png',
	'KannaSip.png',
	'GatoXD.gif',
	'emojis.gif',
	'ainani.png',
	'zerotwolove.png',
	'cat.png',
	'pensiveanimated.gif',
	'kawai.png',
	'pepelaugh.gif',
	'emoji.gif',
	'pepesip.gif',
	'gwnonemeguded.png',
	'awoo.png',
	'ricardomilos.gif',
	'monkamega.png',
	'jerry.png',
	'catrave.gif',
	'minecraft.gif',
	'ree.png',
	'anime.jpg',
	'paimonshock.png',
	'vibingkirby.gif',
	'gigachad.gif'
];

/** Emoji filenames for hi banner rotation */
export const hiBanners = emojiFiles;

/** Map of emoji code (filename without extension) to path for mdsvex preprocessor */
export const emojisMap = Object.fromEntries(
	emojiFiles.map((f) => [f.replace(/\.[^.]+$/, ''), `/emojis/${f}`])
) as Record<string, string>;

/** Array of emoji paths for client-side random emoji hydration */
export const emojiPaths = Object.values(emojisMap);
