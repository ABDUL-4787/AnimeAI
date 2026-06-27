export interface Quest {
  id: string;
  title: string;
  story: string;
  npcDialogue: string;
  theory: string;
  example: string;
  practiceDescription: string;
  initialCode: string;
  expectedVars: string[];
  rewards: {
    xp: number;
    coins: number;
  };
  validate: (vars: Record<string, any>, stdout: string) => { success: boolean; error?: string };
}

export const quests: Quest[] = [
  {
    id: "variables",
    title: "Quest 1: The Blacksmith's Labels (Variables)",
    story: "Deep in the whispering canopy of the Python Forest lies code-smith Kai's forge. A sudden memory-wipe storm swept the village, blanking out the labels of all weapons. Without names, the forge's automatic assembly lines are frozen. Help Kai restore order by defining the primary weapons and player stats.",
    npcDialogue: "Greetings, young adventurer! The system storm has cleared my inventory registers. I need you to create placeholders—what the ancients called 'Variables'—to label my weapons, store your name, and record the forge's core temperature. Can you help?",
    theory: "In Python, a **variable** is a named storage container that holds data. You create a variable simply by writing its name, followed by the assignment operator (`=`), and then the value you want to store.\n\n```python\n# Example of variable creation\nitem_name = \"Nano-Shield\"\nquantity = 5\nratio = 9.81\n```\nVariable names should be descriptive, lowercase, and use underscores for spaces (snake_case). Strings must be enclosed in quotes (`\"` or `'`).",
    example: "# Storing different variables\nsword_type = \"Katana\"\npower_level = 85\nis_active = True",
    practiceDescription: "1. Create a variable named `weapon` and set it to the string `\"Sword\"`.\n2. Create a variable named `player` and set it to the string `\"Kai\"`.\n3. Create a variable named `score` and set it to the integer `100`.\n4. For your custom practice, create a variable named `city` (any city name string), `age` (any age integer), and `language` (set to `\"Python\"`).",
    initialCode: "# --- The Blacksmith's Forge --- \n# Define the weapons and player stats below\n\nweapon = \"Sword\"\nplayer = \"Kai\"\nscore = 100\n\n# TODO: Create the variables 'city', 'age', and 'language' below\n",
    expectedVars: ["weapon", "player", "score", "city", "age", "language"],
    rewards: {
      xp: 100,
      coins: 25
    },
    validate: (vars, stdout) => {
      if (vars.weapon !== "Sword") return { success: false, error: "Make sure you set 'weapon' to the exact string 'Sword'." };
      if (vars.player !== "Kai") return { success: false, error: "Make sure you set 'player' to the exact string 'Kai'." };
      if (vars.score !== 100) return { success: false, error: "Make sure you set 'score' to the exact integer 100." };
      if (!vars.city || typeof vars.city !== 'string') return { success: false, error: "Please define 'city' as a string (e.g. \"Neo-Tokyo\")." };
      if (!vars.age || typeof vars.age !== 'number' || !Number.isInteger(vars.age)) return { success: false, error: "Please define 'age' as an integer." };
      if (vars.language !== "Python") return { success: false, error: "Please define 'language' and set it to 'Python'." };
      return { success: true };
    }
  },
  {
    id: "datatypes",
    title: "Quest 2: Sorting Magic Residues (Data Types)",
    story: "Lyra the Forest Alchemist is brewing a restoration potion to revive the poisoned soil. However, the ingredients have different types of energy—some are solid whole numbers, some are precise decimals, and some are simple yes/no polarities. She needs to correctly identify and type-cast the energy readouts.",
    npcDialogue: "Ah! An adventurer with a working compiler! Excellent. In order to stabilize the potion, I need to know the exact energy format of each ingredient. Let's inspect integers, floats, strings, and booleans.",
    theory: "Python has several built-in **Data Types**:\n- **int**: Whole numbers (e.g., `42`, `-5`).\n- **float**: Decimals (e.g., `3.14`, `-0.001`).\n- **str**: Text sequences (e.g., `\"Alchemist\"`).\n- **bool**: Logical values, which can only be `True` or `False`.\n\nYou can convert between types using casting functions: `int()`, `float()`, `str()`, and `bool()`.\n\n```python\n# Type casting example\nlevel_str = \"12\"\nlevel_num = int(level_str) # Converts str to int\n```",
    example: "# Check types using type()\nenergy = 95.8\nenergy_type = type(energy) # returns <class 'float'>\nconverted = int(energy) # returns 95",
    practiceDescription: "1. Create a variable `essence_count` set to an integer of `42`.\n2. Create a variable `purity` set to a float of `0.99`.\n3. Create a variable `is_stable` set to the boolean `True`.\n4. Cast the float `purity` to an integer and store it in `purity_int`.\n5. Cast the integer `essence_count` to a string and store it in `essence_str`.",
    initialCode: "# --- The Alchemy Lab --- \n# Define essence_count, purity, and is_stable with the correct types.\n\n# TODO: Write your variables here\n",
    expectedVars: ["essence_count", "purity", "is_stable", "purity_int", "essence_str"],
    rewards: {
      xp: 120,
      coins: 30
    },
    validate: (vars, stdout) => {
      if (typeof vars.essence_count !== 'number' || !Number.isInteger(vars.essence_count)) return { success: false, error: "essence_count must be an integer (e.g. 42)" };
      if (typeof vars.purity !== 'number' || Number.isInteger(vars.purity)) return { success: false, error: "purity must be a float (e.g. 0.99)" };
      if (typeof vars.is_stable !== 'boolean' || vars.is_stable !== true) return { success: false, error: "is_stable must be the boolean True" };
      if (vars.purity_int !== 0) return { success: false, error: "purity_int must be purity cast to an integer (which should equal 0)" };
      if (vars.essence_str !== "42") return { success: false, error: "essence_str must be essence_count cast to a string (which should equal '42')" };
      return { success: true };
    }
  },
  {
    id: "io",
    title: "Quest 3: Gatekeeper's Greeting (Input & Output)",
    story: "The entrance to the Python Forest's main village is blocked by a giant Sentinel Mech. It requires visitors to declare their identity and verify their permissions. The mech's interface communicates using terminal lines.",
    npcDialogue: "Access denied. Initiate handshake sequence. Player, write a script that outputs our welcome slogan and accepts your authorization token.",
    theory: "To display information, use the `print()` function. To read text from the player, use the `input()` function. \n\n```python\n# Print a message\nprint(\"System loading...\")\n\n# Accept user input\nuser_name = input(\"Enter username: \")\n```",
    example: "# Printing multiple values\nname = \"Rei\"\nprint(\"Active user:\", name)",
    practiceDescription: "1. Print the string `\"SYSTEM ONLINE\"` to the output using `print()`.\n2. Create a variable named `user_input` and set it to a mock return values from `input(\"Password: \")` (since input() is automated in Pyodide, you can mock input in python by defining a variable: `user_input = \"AccessGranted\"`).\n3. Print `\"Welcome to the Forest\"`.",
    initialCode: "# --- Sentinel Mech Terminal ---\n# Write print statements and mock the input\n\n# TODO: Print \"SYSTEM ONLINE\"\n# TODO: Create a variable user_input = \"AccessGranted\"\n# TODO: Print \"Welcome to the Forest\"\n",
    expectedVars: ["user_input"],
    rewards: {
      xp: 130,
      coins: 35
    },
    validate: (vars, stdout) => {
      const cleanStdout = stdout.trim().toUpperCase();
      if (!cleanStdout.includes("SYSTEM ONLINE")) return { success: false, error: "You must print 'SYSTEM ONLINE' to the terminal." };
      if (vars.user_input !== "AccessGranted") return { success: false, error: "Set 'user_input' to 'AccessGranted'." };
      if (!cleanStdout.includes("WELCOME TO THE FOREST")) return { success: false, error: "You must print 'Welcome to the Forest' to the terminal." };
      return { success: true };
    }
  },
  {
    id: "conditions",
    title: "Quest 4: The Sentinel Barrier (Conditions)",
    story: "The forest barrier's power level fluctuates rapidly. If the power level goes above 100, the barrier will overheat and collapse. If it falls below 20, the barrier will shutdown, letting in cyber-predators. We need a safety protocol to alert the guards.",
    npcDialogue: "The reactor core is unstable! We must deploy a conditional circuit to monitor the reactor's output. Write an conditional branching statement to classify the safety level.",
    theory: "Python uses `if`, `elif`, and `else` statements to run code conditionally based on boolean logic:\n\n```python\npower = 75\nif power > 100:\n    status = \"Danger\"\nelif power < 20:\n    status = \"Warning\"\nelse:\n    status = \"Stable\"\n```\nPython uses indentation (4 spaces) to define code blocks.",
    example: "x = 10\nif x % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
    practiceDescription: "Write a script that inspects a variable `power_level` (currently set to `120`):\n1. If `power_level` is greater than 100, set the variable `safety_status` to `\"OVERLOAD\"`.\n2. If `power_level` is less than 20, set `safety_status` to `\"SHUTDOWN\"`.\n3. Otherwise, set `safety_status` to `\"NORMAL\"`.\nMake sure to use an `if-elif-else` block.",
    initialCode: "# --- Reactor Safety Core ---\npower_level = 120\nsafety_status = \"UNKNOWN\"\n\n# TODO: Implement if-elif-else logic to set safety_status based on power_level\n",
    expectedVars: ["power_level", "safety_status"],
    rewards: {
      xp: 150,
      coins: 40
    },
    validate: (vars, stdout) => {
      if (vars.power_level !== 120) return { success: false, error: "Keep the initial power_level value as 120 for verification." };
      if (vars.safety_status !== "OVERLOAD") return { success: false, error: "For a power level of 120, safety_status should be set to 'OVERLOAD'." };
      return { success: true };
    }
  },
  {
    id: "loops",
    title: "Quest 5: Harvesting Berries (Loops)",
    story: "To restore the energy reserves, we need to gather glowing neon-berries from the mana vines. There are 5 vines in total, and each vine must be harvested three times. Manually harvesting is too slow—we must write an automated loop loop.",
    npcDialogue: "Automation is the key to rebuilding! Write a loop that executes the harvesting routine, summing up the berries gathered.",
    theory: "Python uses `for` loops to iterate over a sequence (like a list or range) and `while` loops to repeat code as long as a condition is true:\n\n```python\n# For loop over a range\nfor i in range(5):\n    print(\"Iteration:\", i)\n\n# While loop\ncount = 0\nwhile count < 3:\n    count += 1\n```",
    example: "total = 0\nfor i in range(1, 6):\n    total += i # sums 1+2+3+4+5",
    practiceDescription: "1. Create a `total_berries` variable and set it to 0.\n2. Write a `for` loop that runs 5 times (using `range(5)`).\n3. Inside the loop, add `3` berries to `total_berries` on each iteration.\n4. Write a `while` loop that decrements a variable `energy_drain` from `10` down to `0` by subtracting `1` each time. Set the loop condition to `energy_drain > 0`.",
    initialCode: "# --- Automated Mana Harvester ---\ntotal_berries = 0\nenergy_drain = 10\n\n# TODO: Implement the for loop to harvest berries\n# TODO: Implement the while loop to drain energy down to 0\n",
    expectedVars: ["total_berries", "energy_drain"],
    rewards: {
      xp: 160,
      coins: 45
    },
    validate: (vars, stdout) => {
      if (vars.total_berries !== 15) return { success: false, error: "The loop should run 5 times and add 3 to total_berries each time, resulting in 15 berries." };
      if (vars.energy_drain !== 0) return { success: false, error: "Your while loop must decrement energy_drain until it reaches 0." };
      return { success: true };
    }
  },
  {
    id: "functions",
    title: "Quest 6: Spell Formulas (Functions)",
    story: "The village defense turrets need to calculate the precise angle to fire plasma shields. Setting up the math equation every time is tedious. Wrap the shielding calculations inside a reusable spell formula (function).",
    npcDialogue: "Functions are like magic spell scrolls. You write them once, store them in the spellbook, and summon them whenever needed by calling their name.",
    theory: "Functions are defined using the `def` keyword, followed by the function name, parameters in parentheses, and a colon. Use the `return` keyword to send a result back:\n\n```python\ndef greet_hero(hero_name):\n    return \"Hail, \" + hero_name\n\n# Call the function\nmessage = greet_hero(\"Rei\")\n```",
    example: "def multiply(a, b):\n    return a * b\n\nresult = multiply(4, 5) # 20",
    practiceDescription: "1. Define a function named `calculate_shield_power` that takes two parameters: `base_energy` and `multiplier`.\n2. Inside the function, return the product of `base_energy` and `multiplier`.\n3. Call the function with parameters `50` and `3` and store the returned value in a variable named `final_shield`.",
    initialCode: "# --- Turret Defense System ---\n\n# TODO: Define the function calculate_shield_power\n\n# TODO: Call it with (50, 3) and save to final_shield\n",
    expectedVars: ["final_shield"],
    rewards: {
      xp: 180,
      coins: 50
    },
    validate: (vars, stdout) => {
      if (vars.final_shield !== 150) return { success: false, error: "Make sure your function returns base_energy * multiplier and you store the result of calling it with 50 and 3 in final_shield (which should equal 150)." };
      return { success: true };
    }
  },
  {
    id: "lists",
    title: "Quest 7: Inventory Scroll (Lists)",
    story: "Your inventory pack is currently a messy pile of cyber-rubble. To carry rare items from the Python Forest, you need to structure your inventory using a linear index called a List. You must add items, remove junk, and check how many things you are carrying.",
    npcDialogue: "A true hacker keeps an structured inventory deck. Let's arrange your items using a Python list.",
    theory: "A **List** in Python is an ordered, changeable collection of items. Lists are defined using square brackets `[]`:\n\n```python\ninventory = [\"Sword\", \"Potion\", \"Shield\"]\n# Add item\ninventory.append(\"Elixir\")\n# Remove item\ninventory.remove(\"Potion\")\n# Length\ncount = len(inventory)\n```",
    example: "fruits = [\"apple\", \"banana\"]\nfruits.append(\"cherry\")\nprint(fruits[0]) # prints \"apple\"",
    practiceDescription: "1. Create a list named `gear` containing `\"Sword\"`, `\"Shield\"`, and `\"Potion\"`.\n2. Append `\"Nano-Key\"` to the end of the `gear` list.\n3. Remove `\"Shield\"` from the list.\n4. Find the number of items left in `gear` and store it in `gear_count` using the `len()` function.",
    initialCode: "# --- Inventory Deck ---\n\n# TODO: Create the list 'gear'\n# TODO: Append 'Nano-Key'\n# TODO: Remove 'Shield'\n# TODO: Store the length in 'gear_count'\n",
    expectedVars: ["gear", "gear_count"],
    rewards: {
      xp: 190,
      coins: 55
    },
    validate: (vars, stdout) => {
      if (!Array.isArray(vars.gear)) return { success: false, error: "gear must be a list." };
      if (vars.gear.includes("Shield")) return { success: false, error: "You should remove 'Shield' from the gear list." };
      if (!vars.gear.includes("Nano-Key")) return { success: false, error: "You should append 'Nano-Key' to the gear list." };
      if (vars.gear_count !== 3) return { success: false, error: "gear_count should reflect the number of items in your list, which should be 3." };
      return { success: true };
    }
  },
  {
    id: "tuples",
    title: "Quest 8: Dimension Coordinates (Tuples)",
    story: "To warp back to the world map, we must configure a teleport portal. Portals require coordinates that are absolutely locked in space. If coordinates shift, you could teleport inside a volcano! We must store these in an immutable Tuple.",
    npcDialogue: "Unlike lists, Tuples are locked for safety. Once written, they cannot be modified, which is perfect for GPS coordinates.",
    theory: "A **Tuple** is an ordered, unchangeable collection of items. They are defined using parentheses `()`:\n\n```python\ncoordinates = (34.05, -118.24)\n# Attempting to change a tuple item will raise a TypeError!\n# coordinates[0] = 50.0  # ERROR!\n```",
    example: "dimensions = (1920, 1080)\nwidth = dimensions[0]",
    practiceDescription: "1. Create a tuple named `portal_coords` containing the coordinates `12.5`, `98.6`, and `45.2`.\n2. Try accessing the first coordinate and saving it to `x_coord`.\n3. Confirm that you do not modify the tuple, keeping it fully immutable.",
    initialCode: "# --- Teleportation Portal ---\n\n# TODO: Define the tuple 'portal_coords' with values 12.5, 98.6, 45.2\n# TODO: Access the first element and save it as 'x_coord'\n",
    expectedVars: ["portal_coords", "x_coord"],
    rewards: {
      xp: 200,
      coins: 60
    },
    validate: (vars, stdout) => {
      if (!vars.portal_coords || typeof vars.portal_coords !== 'object') return { success: false, error: "portal_coords must be a tuple." };
      if (vars.portal_coords[0] !== 12.5 || vars.portal_coords[1] !== 98.6 || vars.portal_coords[2] !== 45.2) {
        return { success: false, error: "portal_coords must contain exactly (12.5, 98.6, 45.2)." };
      }
      if (vars.x_coord !== 12.5) return { success: false, error: "x_coord must be the first element of portal_coords (12.5)." };
      return { success: true };
    }
  },
  {
    id: "sets",
    title: "Quest 9: Filter Residue (Sets)",
    story: "A toxic code leak occurred near the river, generating duplicate data residues. To locate the root cause, we must filter out duplicates so we only analyze unique energy signatures. Sets are designed exactly for this.",
    npcDialogue: "Repeated data is just noise. Sets discard duplicates instantly, keeping only unique signals. Perfect for sensor filtering.",
    theory: "A **Set** is an unordered collection with no duplicate elements. They are defined using curly braces `{}` or by casting a list using `set()`:\n\n```python\nsignatures = {\"alpha\", \"beta\", \"alpha\"} # becomes {'alpha', 'beta'}\nsignatures.add(\"gamma\")\n```",
    example: "raw_data = [1, 2, 2, 3]\nunique_data = set(raw_data) # {1, 2, 3}",
    practiceDescription: "1. Create a set named `signatures` containing `\"gamma\"`, `\"delta\"`, and `\"gamma\"` (the second `\"gamma\"` will be auto-removed).\n2. Add `\"omega\"` to the `signatures` set.\n3. Convert the list `[5, 5, 10, 15, 10]` to a set and store it in `unique_codes`.",
    initialCode: "# --- Sensor Stream Filter ---\n\n# TODO: Create the set 'signatures' with the duplicate values\n# TODO: Add 'omega' to 'signatures'\n# TODO: Convert the list [5, 5, 10, 15, 10] into the set 'unique_codes'\n",
    expectedVars: ["signatures", "unique_codes"],
    rewards: {
      xp: 220,
      coins: 65
    },
    validate: (vars, stdout) => {
      if (!vars.signatures) return { success: false, error: "signatures set must be defined." };
      const sigs = Array.from(vars.signatures as any || []);
      if (!sigs.includes("gamma") || !sigs.includes("delta") || !sigs.includes("omega")) {
        return { success: false, error: "signatures set must contain 'gamma', 'delta', and 'omega'." };
      }
      if (!vars.unique_codes) return { success: false, error: "unique_codes set must be defined." };
      const codes = Array.from(vars.unique_codes as any || []);
      if (codes.length !== 3 || !codes.includes(5) || !codes.includes(10) || !codes.includes(15)) {
        return { success: false, error: "unique_codes must filter the list [5, 5, 10, 15, 10] into {5, 10, 15}." };
      }
      return { success: true };
    }
  },
  {
    id: "dictionary",
    title: "Quest 10: Cyber Bestiary (Dictionaries)",
    story: "You encounter a database containing wild digital beasts roaming the forest. We need to store their details—mapping their names directly to their combat threat rating so we can query them instantaneously.",
    npcDialogue: "A phonebook maps names to numbers. A Python Dictionary maps keys to values, giving you instant access to stats.",
    theory: "A **Dictionary** is a collection of key-value pairs. They are written with curly braces and colons `key: value`:\n\n```python\nbestiary = {\n    \"slime\": 10,\n    \"cyber_wolf\": 45\n}\n# Add/update entry\nbestiary[\"dragon\"] = 95\n# Access\nthreat = bestiary[\"slime\"]\n```",
    example: "stats = {\"HP\": 100, \"MP\": 50}\nprint(stats[\"HP\"]) # 100",
    practiceDescription: "1. Create a dictionary named `bestiary` containing two keys:\n   - `\"Glitch Slime\"` mapped to `15`\n   - `\"Code Spider\"` mapped to `40`\n2. Add a new key `\"Logic Drake\"` mapped to `85` to the `bestiary` dictionary.\n3. Extract the rating of `\"Code Spider\"` and store it in `spider_threat`.",
    initialCode: "# --- Bestiary Database ---\n\n# TODO: Create the dictionary 'bestiary'\n# TODO: Add 'Logic Drake' with threat level 85\n# TODO: Store 'Code Spider's threat level in 'spider_threat'\n",
    expectedVars: ["bestiary", "spider_threat"],
    rewards: {
      xp: 240,
      coins: 70
    },
    validate: (vars, stdout) => {
      if (!vars.bestiary || typeof vars.bestiary !== 'object') return { success: false, error: "bestiary must be a dictionary." };
      
      // Handle mapping structures extracted from Pyodide
      const getVal = (key: string) => {
        if (typeof vars.bestiary.get === 'function') {
          return vars.bestiary.get(key);
        }
        return vars.bestiary[key];
      };

      if (getVal("Glitch Slime") !== 15) return { success: false, error: "Glitch Slime must have a threat rating of 15." };
      if (getVal("Code Spider") !== 40) return { success: false, error: "Code Spider must have a threat rating of 40." };
      if (getVal("Logic Drake") !== 85) return { success: false, error: "Logic Drake must be added with a threat rating of 85." };
      if (vars.spider_threat !== 40) return { success: false, error: "spider_threat must store Code Spider's rating (40)." };
      return { success: true };
    }
  },
  {
    id: "files",
    title: "Quest 11: The Ancient Ledger (File Handling)",
    story: "Hidden under the roots of the world tree is the Ancient Ledger, a text-based storage log. To preserve the names of rescued villagers, we must write a script that opens the ledger, appends names, and displays the content.",
    npcDialogue: "Files allow variables to survive after the power turns off. Let's learn to read and write to virtual disk files.",
    theory: "To open a file, use the `open(filename, mode)` function. Common modes are `'r'` for reading, `'w'` for writing (overwrites), and `'a'` for appending. It is best practice to use the `with` block so the file is closed automatically:\n\n```python\nwith open(\"log.txt\", \"w\") as f:\n    f.write(\"Data entry\\n\")\n```",
    example: "with open(\"quest.txt\", \"r\") as f:\n    lines = f.read()",
    practiceDescription: "In Pyodide, we have an in-memory virtual filesystem.\n1. Write a block that opens a file called `\"ledger.txt\"` in write mode (`'w'`) and writes the text `\"Hero: Kai\"` to it.\n2. Open `\"ledger.txt\"` in read mode (`'r'`), read the contents, and store the result in the variable `ledger_data`.",
    initialCode: "# --- Virtual Disk Drive ---\n\n# TODO: Write \"Hero: Kai\" to \"ledger.txt\"\n# TODO: Read \"ledger.txt\" contents into the variable 'ledger_data'\n",
    expectedVars: ["ledger_data"],
    rewards: {
      xp: 250,
      coins: 80
    },
    validate: (vars, stdout) => {
      if (!vars.ledger_data) return { success: false, error: "ledger_data variable must contain the text read from ledger.txt." };
      if (vars.ledger_data.trim() !== "Hero: Kai") return { success: false, error: "ledger_data content should be exactly 'Hero: Kai'." };
      return { success: true };
    }
  },
  {
    id: "oop",
    title: "Quest 12: Summoning Constructs (OOP)",
    story: "The final barrier is guarded by a Corruption Core! To defeat it, you cannot just cast single variables—you must construct an entire entity, a custom combat drone. This requires creating a blueprint Class, setting health and weapon stats, and instantiating it for battle.",
    npcDialogue: "Object-Oriented Programming (OOP) is the pinnacle of coding magic. A Class is the blueprint for a golem, and the Object is the golem you summon to fight!",
    theory: "Define a class using the `class` keyword. The constructor function is `__init__` which initializes attributes. The keyword `self` represents the instance of the object:\n\n```python\nclass Golem:\n    def __init__(self, name, power):\n        self.name = name\n        self.power = power\n\n    def attack(self):\n        return self.name + \" strikes!\"\n```",
    example: "class Pet:\n    def __init__(self, name):\n        self.name = name\n\nmy_pet = Pet(\"Byte\")",
    practiceDescription: "1. Create a class named `Drone`.\n2. Define the constructor `__init__(self, name, shield)` to set the attributes `self.name` and `self.shield`.\n3. Define a method in the class named `take_damage(self, amount)` that subtracts `amount` from `self.shield`.\n4. Instantiate an object named `my_drone` with name `\"Alpha\"` and shield `100`.\n5. Call the `take_damage(30)` method on `my_drone` to verify it works.",
    initialCode: "# --- Drone Assembly Line ---\n\n# TODO: Create the class Drone with __init__ and take_damage\n# TODO: Create my_drone with name 'Alpha' and shield 100\n# TODO: Call my_drone.take_damage(30)\n",
    expectedVars: ["my_drone"],
    rewards: {
      xp: 300,
      coins: 100
    },
    validate: (vars, stdout) => {
      if (!vars.my_drone) return { success: false, error: "You must create an instance of Drone named 'my_drone'." };
      if (typeof vars.my_drone !== 'object') return { success: false, error: "my_drone must be an object." };
      
      // Check attributes
      let name, shield;
      try {
        name = vars.my_drone.name;
        shield = vars.my_drone.shield;
      } catch (e) {
        return { success: false, error: "my_drone must have name and shield attributes." };
      }

      if (name !== "Alpha") return { success: false, error: "my_drone's name attribute must be 'Alpha'." };
      if (shield !== 70) return { success: false, error: "my_drone's shield attribute must be 70 (started at 100, took 30 damage)." };
      return { success: true };
    }
  }
];
