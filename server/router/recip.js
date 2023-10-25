const express = require("express");
const Recipe = require("../models/recipeschema");
const router = express.Router();
const DietPlan = require("../models/dietschema");
const RequestDietPlan = require("../models/requestdietschema");
require("dotenv").config();
const {Configuration, OpenAIApi} = require("openai");

router.get("/recipes", async (req, res) => {
  const type = req.query.type;
  const sugarFreeRecipes = await Recipe.find({ type: "sugar free" });
  res.json(sugarFreeRecipes);
});

router.get("/recipes2", async (req, res) => {
  const type = req.query.type;
  const carbRecipes = await Recipe.find({ type: "carb free" });
  res.json(carbRecipes);
});

router.get("/recipes3", async (req, res) => {
  const type = req.query.type;
  const proteinRecipes = await Recipe.find({ type: "protein" });
  res.json(proteinRecipes);
});

router.get("/recipes4", async (req, res) => {
  const type = req.query.type;
  const dairyRecipes = await Recipe.find({ type: "dairy" });
  res.json(dairyRecipes);
});

router.get("/recipes5", async (req, res) => {
  const type = req.query.type;
  const starchRecipes = await Recipe.find({ type: "starch free" });
  res.json(starchRecipes);
});

router.get("/recipes6", async (req, res) => {
  const type = req.query.type;
  const allRecipes = await Recipe.find();
  res.json(allRecipes);
});

router.delete('/recipes7/:recipeId', async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId);

    await Recipe.findByIdAndDelete(recipeId);
  } catch (err) {
    console.log(err);
  }
});

router.post('/recipes8', async (req, res) => {
  try {
    const { name, type, ingredients, instructions } = req.body;
    const recipe = new Recipe({ name, type, ingredients, instructions });
    await recipe.save();
    res.status(201).json({ message: 'Recipe created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Recipe not added' });
  }
});


router.put('/recipes9/:name', async (req, res) => {
  const { name } = req.params;
  const { type, ingredients, instructions } = req.body;

  const updatedFields = {};

  if (type) updatedFields.type = type;
  if (ingredients) updatedFields.ingredients = ingredients;
  if (instructions) updatedFields.instructions = instructions;

  try {
    const recipe = await Recipe.findOneAndUpdate(
      { name },
      updatedFields,
      { new: true }
    );
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
});

router.get("/diet", async (req, res) => {
  const type = req.query.type;
  const allDiets = await DietPlan.find();
  res.json(allDiets);
});

router.delete('/diet7/:dietId', async (req, res) => {
  try {
    const dietId = req.params.dietId;
    const diet = await DietPlan.findById(dietId);

    await DietPlan.findByIdAndDelete(dietId);

  } catch (err) {
    console.log(err);
  }
});

router.post('/diet8', async (req, res) => {
  try {
    const { name, type, duration, details } = req.body;
    const diet = new DietPlan({ name, type, duration, details });
    await diet.save();
    res.status(201).json({ message: 'Diet Plan created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Diet Plan not added' });
  }
});


router.put('/diet9/:name', async (req, res) => {
  const { name } = req.params;
  const { type, duration, details } = req.body;

  const updatedFields = {};

  if (type) updatedFields.type = type;
  if (duration) updatedFields.duration = duration;
  if (details) updatedFields.details = details;

  try {
    const diet = await DietPlan.findOneAndUpdate(
      { name },
      updatedFields,
      { new: true }
    );
    res.json(diet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
});

router.post('/requestdiet', async (req, res) => {
  try {
    const existingRequest = await RequestDietPlan.findOne({ email: req.body.email });
    if (existingRequest) {
      return res.status(400).send('Email already exists');
    }

    const newRequestDietPlan = new RequestDietPlan({
      email: req.body.email,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      prefer: req.body.prefer,
      avoid: req.body.avoid,
      goal: req.body.goal,
      complete: req.body.complete,
      plan: req.body.plan
    });

    await newRequestDietPlan.save();

    res.status(200).send('Data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.get("/viewRequestedDietPlans", async (req, res) => {
  const type = req.query.type;
  const requests = await RequestDietPlan.find();
  res.json(requests);
});

router.post('/assignDietPlan', async (req, res) => {
  const { requestId, dietPlan } = req.body;

  try {
    // Find the diet request by ID
    const request = await RequestDietPlan.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update the request with the assigned diet plan
    request.plan = dietPlan;
    request.complete = true;

    // Save the updated request to the database
    const updatedRequest = await request.save();

    res.status(200).json(updatedRequest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/dietplann/:email', async (req, res) => {
  try {
    const query = { email: req.params.email };
    const userRequest = await RequestDietPlan.findOne(query);
    if (!userRequest) {
      return res.status(404).send('Request not found for user with email: ' + req.params.email);
    }

    res.send(userRequest);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.get('/dietplanfull/:plan', async (req, res) => {
  try {
    
    const query = { name: req.params.plan };
    
    const userRequest = await DietPlan.findOne(query);
    if (!userRequest) {
      return res.status(404).send('Diet Plan not found');
    }
    
    res.send(userRequest);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/openai", async(req, res) => {
  try{
    const {prompt} = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a recipe based on these ingredients: ${prompt}
               ###`,
      temperature: 0.3,
      max_tokens: 800,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text
    });
  }
  catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err.response
      ? err.response.data
      : 'Internal server error', 
    });
  }
});

module.exports= router;