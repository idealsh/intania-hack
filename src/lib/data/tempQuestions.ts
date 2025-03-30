export const tempQuestions = {
    math: [
      {
        subCat: "Prob. & Stats",
        question: "A survey shows that 60% of students prefer coffee over tea. If 200 students were surveyed, how many prefer coffee?",
        choices: ["100", "120", "140", "160"],
        correctAnswer: "120",
        info: "Percentages represent a fraction of a whole, often out of 100.",
        explain: "60% of 200 is 120 (0.6 × 200 = 120).",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Pie_chart.png",
      },
      {
        subCat: "Trigonometry",
        question: "A ladder leans against a wall making a 30° angle with the ground. If the ladder is 10m long, how high does it reach?",
        choices: ["5m", "8m", "10m", "15m"],
        correctAnswer: "5m",
        info: "Trigonometry helps calculate lengths and angles in right-angled triangles.",
        explain: "Using sin(30°) = opposite/hypotenuse, the height is 10 × sin(30°) = 5m.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Triangle_with_notations_2.svg",
      },
      {
        subCat: "Algebra",
        question: "If 3x + 5 = 14, what is the value of x?",
        choices: ["2", "3", "4", "5"],
        correctAnswer: "3",
        info: "Equations can be solved by isolating the variable step by step.",
        explain: "Solving for x: 3x = 9, so x = 3.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Algebraic_equation.svg",
      },
      {
        subCat: "Algebra",
        question: "You buy 1 cone of ice cream for $1.50. A shop gives a deal: Buy 4, get 1 free. How much would each cone have to cost individually to match the value of the deal?",
        choices: ["$1.50","$1.20","$1.00"],
        correctAnswer: "$1.20",
        info: "This is a unit rate problem—an essential concept in algebra and economics",
        explain: " In the deal, you pay for 4 cones ($1.50 × 4 = $6) and get 5 cones. So the cost per cone = $6 ÷ 5 = $1.20.",
      },
      {
        subCat: "Geometry",
        question: "What’s the minimum number of straight cuts needed to divide a pizza into 8 equal slices?",
        choices: ["3","4","5"],
        correctAnswer: "4",
        info: "This is a classic example of spatial reasoning and 2D geometry, focusing on angles and symmetry.",
        explain: "With creative placement, 3 cuts can give you 6 slices (if they all go through the center). To get 8, you need 4 straight cuts.",
      },
      {
        subCat: "Statistics",
        question: "You have 10 banana bunches; one bunch is fake and each banana in it weighs 10% less. You can weigh only once. Can you find the fake one?",
        choices: ["Yes","No","I don't know"],
        correctAnswer: "Yes",
        info: "This is a smart use of weighted averages and difference detection.",
        explain: " Label the bunches 1–10. Take 1 banana from bunch 1, 2 from bunch 2, etc., ending with 10 from bunch 10. If all bananas were normal, the total weight would be 550g (assuming 1 banana = 10g). But if the scale shows 549g, the 1g deficit means bunch 1 is fake. A 2g deficit means bunch 2, and so on.",
      }
    ],
    science: [
      {
        subCat: "Biology",
        question: "Which organelle is known as the powerhouse of the cell?",
        choices: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correctAnswer: "Mitochondria",
        info: "Cells have different organelles that perform specific functions.",
        explain: "Mitochondria generate energy in the form of ATP, essential for cell functions.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Mitochondrion.svg",
      },
      {
        subCat: "Chemistry",
        question: "What is the chemical formula for table salt?",
        choices: ["NaCl", "H2O", "CO2", "O2"],
        correctAnswer: "NaCl",
        info: "Chemical formulas represent the elements that make up a compound.",
        explain: "Table salt is composed of sodium (Na) and chloride (Cl), forming NaCl.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/NaCl_structure.png",
      },
      {
        subCat: "Physics",
        question: "Which of the following objects will fall the fastest in a vacuum?",
        choices: ["A feather", "A bowling ball", "A piece of paper", "All fall at the same rate"],
        correctAnswer: "All fall at the same rate",
        info: "Gravity pulls all objects downward at the same acceleration, but air resistance can slow some down.",
        explain: "In a vacuum, where there is no air resistance, all objects fall at the same rate due to gravity.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Gravity_falling_objects.svg",
      },
      {
        subCat: "Physics",
        question: "If you drop a rock from 1 meter on the Moon, will it fall slower or faster than on Earth?",
        choices: ["Longer (about 2.5× longer)", "Same", "Shorter"],
        correctAnswer: "Longer (about 2.5× longer)",
        info: "Uses gravity difference between Earth and the Moon.",
        explain: "Gravity on the Moon is 1.62 m/s² compared to Earth’s 9.8 m/s². Lower gravity means slower acceleration, so the rock falls more slowly—taking about 2.5× longer."
      },
      {
        subCat: "Chemistry",
        question: "How heavy is a 10×10×10 cm cube of solid gold? (Gold density ≈ 19.3 g/cm³)",
        choices: ["19.3 kg", "50 kg", "19.3 g"],
        correctAnswer: "19.3 kg",
        info: "Applies density and volume to calculate mass.",
        explain: "Volume = 1,000 cm³. Multiply by gold's density: 1,000 × 19.3 = 19,300g = 19.3 kg. This is how density relates to mass and volume."
      },
      {
        subCat: "Biology",
        question: "How long does it take for a red blood cell to complete one full circuit through the human body?",
        choices: ["1 minute", "20 seconds", "5 minutes"],
        correctAnswer: "20 seconds",
        info: "Shows how efficiently the circulatory system works.",
        explain: "Red blood cells travel quickly—pumped by the heart at around 5 liters/minute. One complete circulation loop takes only about 20 seconds under normal conditions."
      }
    ],
    general: [
        {
          subCat: "Social Studies",
          question: "What do we call the total value of all goods and services produced in a country?",
          choices: ["Inflation", "Gross Domestic Product (GDP)", "Supply and Demand", "Trade Deficit"],
          correctAnswer: "Gross Domestic Product (GDP)",
          info: "Economists measure a country's economy using different indicators.",
          explain: "GDP measures the total economic output of a country within a specific period.",
          image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/GDP_World_Map.png",
        },
        {
          subCat: "Psychology",
          question: "Which psychological phenomenon causes people to perform better when others are watching?",
          choices: ["Social Loafing", "Bystander Effect", "Social Facilitation", "Cognitive Dissonance"],
          correctAnswer: "Social Facilitation",
          info: "Psychology studies how people behave in different situations, including group settings.",
          explain: "Social Facilitation suggests that people tend to perform better at simple tasks when being observed.",
          image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Group_discussion.jpg",
        },
        {
          subCat: "Environment",
          question: "Which gas is most responsible for global warming?",
          choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
          correctAnswer: "Carbon Dioxide",
          info: "The Earth's atmosphere contains different gases, some of which trap heat.",
          explain: "CO2 traps heat in the atmosphere, contributing to climate change.",
          image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Greenhouse_effect.svg",
        },
        {
          subCat: "Social Studies",
          question: "If a person walks 5 km/hour for 8 hours a day, how many days would it take to walk around the Earth's equator (40,075 km)?",
          choices: ["1,002 days", "502 days", "365 days"],
          correctAnswer: "1,002 days",
          info: "A real-world application of rate × time = distance.",
          explain: "The person walks 5 km/hour × 8 hours = 40 km/day. Total distance is 40,075 km. 40,075 ÷ 40 = 1,001.875, so it would take about 1,002 days to complete the walk."
        },
        {
          subCat: "Psychology",
          question: "How fast can the human brain process a visual image?",
          choices: ["250 milliseconds", "13 milliseconds", "100 milliseconds"],
          correctAnswer: "13 milliseconds",
          info: "Highlights the brain's incredible speed in visual processing.",
          explain: "Studies by MIT show the brain can process images in as little as 13 milliseconds. This showcases the efficiency of the visual cortex and human perception."
        },
        {
          subCat: "Environment",
          question: "One tree absorbs about 22 kg of CO₂ per year. If driving 10,000 km emits about 0.12 kg/km, how many trees are needed to offset this?",
          choices: ["55 trees", "22 trees", "100 trees"],
          correctAnswer: "55 trees",
          info: "Demonstrates carbon footprint and environmental offsetting.",
          explain: "Driving 10,000 km at 0.12 kg/km emits 1,200 kg of CO₂. Divide by 22 kg per tree: 1,200 ÷ 22 ≈ 55 trees needed to offset that annually."
        }
      ],
    };