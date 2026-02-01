const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");

const User = require('../user');
const app = express()
app.use(express.json())


app.use(cors({
  origin: "http://localhost:8080", // wherever your HTML is served from
  credentials: true,
}));

app.use(session({
  secret: "studbuds_dev_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 6 }
}));





function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });
  next();
}

function sanitize(userDoc) {
  const u = userDoc.toObject ? userDoc.toObject() : userDoc;
  if (u?.personal?.passwordHash) delete u.personal.passwordHash;
  return u;
}


// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "email + password required" });

    const user = await User.findOne({ "personal.email": email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.personal.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    req.session.userId = user._id.toString();
    res.json({ ok: true, user: sanitize(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT
app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// ME
app.get("/api/auth/me", async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(401).json({ message: "Session invalid" });
    res.json({ ok: true, user: sanitize(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE PROFILE (personal/school/courses/availability)
app.put("/api/profile", requireAuth, async (req, res) => {
  try {
    const update = req.body || {};
    if (update?.personal?.passwordHash) delete update.personal.passwordHash;
    if (update?.personal?.email) update.personal.email = update.personal.email.toLowerCase();

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (update.personal) user.personal = { ...user.personal.toObject(), ...update.personal };
    if (update.school) user.school = { ...user.school.toObject(), ...update.school };

    await user.save();
    res.json({ ok: true, user: sanitize(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// SEARCH USERS (basic filters)
app.get("/api/users/search", requireAuth, async (req, res) => {
  try {
    const { program, dept, number, term, gender } = req.query;

    const q = { _id: { $ne: req.session.userId } };
    if (program) q["school.program"] = program;
    if (gender) q["personal.gender"] = gender;

    if (dept || number || term) {
      q["school.courses"] = {
        $elemMatch: {
          ...(dept ? { dept } : {}),
          ...(number ? { number } : {}),
          ...(term ? { term } : {}),
        },
      };
    }

    const users = await User.find(q).limit(50);
    res.json({ ok: true, users: users.map(userPreview) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});





function userPreview(userDoc) {
  return {
    id: userDoc._id,
    name: userDoc.personal.name,
    program: userDoc.school.program,
    year: userDoc.school.year
  };
}

function publicProfile(userDoc) {
  return {
    id: userDoc._id,
    name: userDoc.personal.name,
    email: userDoc.personal.email,
    gender: userDoc.personal.gender,
    school: {
      schoolName: userDoc.school.schoolName,
      program: userDoc.school.program,
      year: userDoc.school.year,
      courses: userDoc.school.courses,
      studyAvailability: userDoc.school.studyAvailability
    }
  };
}

// LIST ALL USERS (preview list)
app.get("/api/users", requireAuth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.session.userId } }).limit(50);

    res.json({
      ok: true,
      users: users.map(userPreview)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET FULL USER PROFILE (when you click someone)
app.get("/api/users/:id", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ ok: true, user: publicProfile(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});






// health
app.get("/api/health", (req, res) => res.json({ ok: true }));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});