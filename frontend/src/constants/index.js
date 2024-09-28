import {
    wristflexor,
    warrior,
    cobra,
    wristcircle,
    shouldercircle,
    straightlegraise,
    fingerstretch,
    catcow,
    bicepcurls,
    samriddhi,
    aashma,
    kushal,
    sushil

} from '../assets';


export const exercises = [
    {
        id: 1,
        exercise: "Warrior Pose",
        pic: warrior,
        steps: [
            "Stand with your feet wide apart.",
            "Turn your right foot out 90 degrees and your left foot in 45 degrees.",
            "Raise your arms to shoulder level.",
            "Bend your right knee to a 90-degree angle.",
            "Hold the pose for 30 seconds.",
            "Repeat on the other side."
        ]
    },

    
    {
        id: 2,
        exercise: "Bicep Curls",
        pic: bicepcurls,
        steps: [
            "Stand with your feet shoulder-width apart.",
            "Hold a dumbbell in each hand with your arms at your sides.",
            "Bend your elbows and curl the weights toward your shoulders.",
            "Slowly lower the weights back to the starting position.",
        ]
    },

    {
        "id": 3,
        "exercise": "Cobra Pose",
        "pic": cobra,
        "steps": [
            "Lie face down on the floor with your legs extended and the tops of your feet flat on the ground.",
            "Place your hands under your shoulders, keeping your elbows close to your body.",
            "Press into your hands to lift your chest off the ground, engaging your back muscles.",
            "Keep your pelvis grounded and your shoulders relaxed away from your ears.",
            "Hold the pose for 15-30 seconds, then gently release back to the floor."
        ]
    },
    {
        id: 4,
        exercise: "Wrist Flexor Stretch",
        pic: wristflexor,
        steps: [
            "Extend your arm in front of you with your palm facing up.",
            "Bend your wrist, pointing your hand toward the floor.",
            "With your other hand, gently bend your wrist farther until you feel a mild to moderate stretch in your forearm.",
            "Hold the stretch for at least 15 to 30 seconds. Repeat 2 to 4 times."
        ]
    },
    {
        id: 5,
        exercise: "Straight Leg Raise",
        pic: straightlegraise,
        steps: [
            "Lie on your back with your legs straight and your arms at your sides.",
            "Keeping your legs straight, raise your right leg to a 45-degree angle.",
            "Hold for 5 seconds.",
            "Lower your leg to the floor.",
            "Repeat with your left leg.",
            "Do 10 repetitions with each leg.",
            "Work up to 20 repetitions with each leg."
        ]

    },
    {
        id: 6,
        exercise: "Shoulder Circles",
        pic: shouldercircle,
        steps: [
            "Stand with your feet shoulder-width apart.",
            "Extend your arms out to the sides.",
            "Make small circles with your arms, starting with 10 circles in each direction.",
            "Work up to 20 circles in each direction."
        ]
    },
    {
        id: 7,
        exercise: "Wrists Circles",
        pic: wristcircle,
        steps: [
            "Extend your arms in front of you with your palms facing down.",
            "Make a fist with each hand.",
            "Rotate your wrists in a circular motion.",
            "Do 10 circles in one direction and then 10 in the other direction."
        ]
    },
    {
        id: 8,
        exercise: "Cat Cow Stretch",
        pic: catcow,
        steps: [
            "Get on your hands and knees with your wrists directly under your shoulders and your knees directly under your hips.",
            "Inhale as you arch your back, lifting your head and tailbone toward the ceiling.",
            "Exhale as you round your back, tucking your chin and tailbone.",
            "Repeat 10 times."
        ]
    },
    {
        id: 9,
        exercise: "Finger Stretch",
        pic: fingerstretch,
        steps: [
            "Extend your arm in front of you with your palm facing down.",
            "Use your other hand to gently bend your fingers down.",
            "Hold the stretch for at least 15 to 30 seconds. Repeat 2 to 4 times."
        ]
    }
]


export const goals = [
    "5 Exercises daily",
    "10 minutes daily",
    "5 days a week",
    "2 months"
]


export const doctors = [
    {
        id: 1,
        profile: samriddhi,
        name: "Dr. Samriddhi Shrestha",
        hospital: "Kathmandu Physiotherapy Clinic",
        info: "Dr. Samriddhi Shrestha is a physiotherapist with over 10 years of experience. She specializes in treating musculoskeletal conditions, sports injuries, and post-surgical rehabilitation. She is passionate about helping her patients achieve their health and fitness goals through personalized treatment plans and evidence-based practice.",
        specializations: ["Musculoskeletal conditions", "Sports injuries", "Post-surgical rehabilitation"]
    },
    {
        id: 2,
        profile: kushal,
        name: "Dr. Kushal Kathiwada",
        hospital: "Goodlife Physiotherapy",
        info: "Dr. Kushal Kathiwada is a physiotherapist with over 5 years of experience. He specializes in treating neurological conditions, pediatric disorders, and geriatric care. He is dedicated to providing compassionate care to his patients and helping them improve their quality of life.",
        specializations: ["Neurological conditions", "Pediatric disorders", "Geriatric care"]
    },
    {
        id: 3,
        profile: aashma,
        name: "Dr. Aashma Bhattrai",
        hospital: "MV Physiotherapy Clinic",
        info: "Dr. Aashma Bhattrai is a physiotherapist with over 7 years of experience. She specializes in treating orthopedic",
        specializations: ["Orthopedic conditions", "Cardiopulmonary rehabilitation"]
    },
    {
        id: 4,
        profile: sushil,
        name: "Dr. Sushil Kharel",
        hospital: "Sarthak Health Care",
        info: "Dr. Sushil Kharel is a physiotherapist with over 8 years of experience. He specializes in treating musculoskeletal conditions, sports injuries, and post-surgical rehabilitation. He is committed to providing high-quality care to his patients and helping them achieve their health and wellness goals.",
        specializations: ["Musculoskeletal conditions", "Sports injuries", "Post-surgical rehabilitation"]
    }
]