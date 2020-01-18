/**
 * Holder for the template file being displayed.
 */
var g_Template = {};

/**
 * Holder for the template lists generated by compileTemplateLists().
 */
var g_TemplateLists = {};

/**
 * Used to display textual information and the build/train lists of the
 * template being displayed.
 *
 * At present, these are drawn in the main body of the page.
 */
var g_InfoFunctions = [
	getEntityTooltip,
	getHistoryTooltip,
	getDescriptionTooltip,
	getAurasTooltip,
	getVisibleEntityClassesFormatted,
	getBuiltByText,
	getTrainedByText,
	getResearchedByText,
	getBuildText,
	getTrainText,
	getResearchText,
	getUpgradeText
];

/**
 * Override style so we can get a bigger specific name.
 */
g_TooltipTextFormats.nameSpecificBig.font = "sans-bold-20";
g_TooltipTextFormats.nameSpecificSmall.font = "sans-bold-16";
g_TooltipTextFormats.nameGeneric.font = "sans-bold-16";

/**
 * Path to unit rank icons.
 */
var g_RankIconPath = "session/icons/ranks/";

/**
 * Page initialisation. May also eventually pre-draw/arrange objects.
 *
 * @param {object} data - Contains the civCode and the name of the template to display.
 * @param {string} data.templateName
 * @param {string} [data.civ]
 */
function init(data)
{
	if (!data || !data.templateName)
	{
		error("Viewer: No template provided");
		closePage();
		return;
	}

	let templateName = removeFiltersFromTemplateName(data.templateName);
	let isTech = techDataExists(templateName);

	// Attempt to get the civ code from the template, or, if
	// it's a technology, from the researcher's template.
	if (!isTech)
	{
		// Catch and redirect if template is a non-promotion variant of
		// another (ie. units/{civ}_support_female_citizen_house).
		templateName = getBaseTemplateName(templateName);

		g_SelectedCiv = loadTemplate(templateName).Identity.Civ;
	}

	if (g_SelectedCiv == "gaia" && data.civ)
		g_SelectedCiv = data.civ;

	g_TemplateLists = compileTemplateLists(g_SelectedCiv);
	g_CurrentModifiers = deriveModifications(g_AutoResearchTechList);

	g_Template = isTech ? loadTechnology(templateName) : loadEntityTemplate(templateName);
	if (!g_Template)
	{
		error("Viewer: unable to recognise or load template (" + templateName + ")");
		closePage();
		return;
	}

	g_StatsFunctions = [getEntityCostTooltip].concat(g_StatsFunctions);

	draw();
}

/**
 * Populate the UI elements.
 */
function draw()
{
	Engine.GetGUIObjectByName("entityName").caption = getEntityNamesFormatted(g_Template);

	let entityIcon = Engine.GetGUIObjectByName("entityIcon");
	entityIcon.sprite = "stretched:session/portraits/" + g_Template.icon;

	let entityStats = Engine.GetGUIObjectByName("entityStats");
	entityStats.caption = buildText(g_Template, g_StatsFunctions);

	let entityInfo = Engine.GetGUIObjectByName("entityInfo");
	let infoSize = entityInfo.size;
	// The magic '8' below provides a gap between the bottom of the icon, and the start of the info text.
	infoSize.top = Math.max(entityIcon.size.bottom + 8, entityStats.size.top + entityStats.getTextSize().height);
	entityInfo.size = infoSize;

	entityInfo.caption = buildText(g_Template, g_InfoFunctions, "\n\n");

	if (g_Template.promotion)
		Engine.GetGUIObjectByName("entityRankGlyph").sprite = "stretched:" + g_RankIconPath + g_Template.promotion.current_rank + ".png";
	Engine.GetGUIObjectByName("entityRankGlyph").hidden = !g_Template.promotion;
}

function getBuiltByText(template)
{
	if (g_SelectedCiv == "gaia" || !g_TemplateLists.structures.has(template.name.internal))
		return "";

	let builders = g_TemplateLists.structures.get(template.name.internal);
	if (!builders.length)
		return "";

	// Translation: Label before a list of the names of units that build the structure selected.
	return buildListText(translate("Built by:"), builders.map(builder => getEntityNames(loadEntityTemplate(builder))));
}

function getTrainedByText(template)
{
	if (g_SelectedCiv == "gaia" || !g_TemplateLists.units.has(template.name.internal))
		return "";

	let trainers = g_TemplateLists.units.get(template.name.internal);
	if (!trainers.length)
		return "";

	// Translation: Label before a list of the names of structures or units that train the unit selected.
	return buildListText(translate("Trained by:"), trainers.map(trainer => getEntityNames(loadEntityTemplate(trainer))));
}

function getResearchedByText(template)
{
	if (g_SelectedCiv == "gaia" || !g_TemplateLists.techs.has(template.name.internal))
		return "";

	let researchers = g_TemplateLists.techs.get(template.name.internal);
	if (!researchers.length)
		return "";

	// Translation: Label before a list of names of structures or units that research the technology selected.
	return buildListText(translate("Researched at:"), researchers.map(researcher => getEntityNames(loadEntityTemplate(researcher))));
}

/**
 * @return {string} List of the names of the structures the selected unit can build.
 */
function getBuildText(template)
{
	if (!template.builder || !template.builder.length)
		return "";

	// Translation: Label before a list of the names of structures the selected unit can construct or build.
	return buildListText(translate("Builds:"),
		template.builder.map(prod => getEntityNames(loadEntityTemplate(prod))));
}

/**
 * @return {string} List of the names of the technologies the selected structure/unit can research.
 */
function getResearchText(template)
{
	if (!template.production || !template.production.techs || !template.production.techs.length)
		return "";

	let researchNames = [];
	for (let tech of template.production.techs)
	{
		let techTemplate = loadTechnology(tech);
		if (techTemplate.reqs)
			researchNames.push(getEntityNames(techTemplate));
	}

	// Translation: Label before a list of the names of technologies the selected unit or structure can research.
	return buildListText(translate("Researches:"), researchNames);
}

/**
 * @return {string} List of the names of the units the selected unit can train.
 */
function getTrainText(template)
{
	if (!template.production || !template.production.units || !template.production.units.length)
		return "";

	// Translation: Label before a list of the names of units the selected unit or structure can train.
	return buildListText(translate("Trains:"),
		template.production.units.map(prod => getEntityNames(loadEntityTemplate(prod))));
}

/**
 * @return {string} List of the names of the structures/units the selected structure/unit can upgrade to.
 */
function getUpgradeText(template)
{
	if (!template.upgrades)
		return "";

	// Translation: Label before a list of the names of units or structures the selected unit or structure can be upgradable to.
	return buildListText(translate("Upgradable to:"),
		template.upgrades.map(upgrade => getEntityNames(upgrade.name ? upgrade : loadEntityTemplate(upgrade.entity))));
}
