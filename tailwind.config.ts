// // import type { Config } from "tailwindcss";

// // const config: Config = {
// //   content: [
// //     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
// //     "./components/**/*.{js,ts,jsx,tsx,mdx}",
// //     "./app/**/*.{js,ts,jsx,tsx,mdx}",
// //   ],
// //   theme: {
// //     extend: {
// //       colors: {
// //         background: "var(--background)",
// //         foreground: "var(--foreground)",
// //       },
// //     },
// //   },
// //   plugins: [],
// // };
// // export default config;
// import type { Config } from "tailwindcss";

// const config: Config = {
//     darkMode: ["class"],
//     content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//   	fontSize: {
//   		'heading1-bold': [\n        "50px",\n        {\n          lineHeight: "100%",\n          fontWeight: "700",\n        },\n      ],
//   		'heading2-bold': [\n        "30px",\n        {\n          lineHeight: "100%",\n          fontWeight: "700",\n        },\n      ],
//   		'heading3-bold': [\n        "24px",\n        {\n          lineHeight: "100%",\n          fontWeight: "700",\n        },\n      ],
//   		'heading4-bold': [\n        "20px",\n        {\n          lineHeight: "100%",\n          fontWeight: "700",\n        },\n      ],
//   		'body-bold': [\n        "18px",\n        {\n          lineHeight: "100%",\n          fontWeight: "700",\n        },\n      ],
//   		'body-semibold': [\n        "18px",\n        {\n          lineHeight: "100%",\n          fontWeight: "600",\n        },\n      ],
//   		'body-medium': [\n        "18px",\n        {\n          lineHeight: "100%",\n          fontWeight: "500",\n        },\n      ],
//   		'base-bold': [\n        "16px",\n        {\n          lineHeight: "100%",\n          fontWeight: "600",\n        },\n      ],
//   		'base-medium': [\n        "16px",\n        {\n          lineHeight: "100%",\n          fontWeight: "500",\n        },\n      ]
//   	},
//   	extend: {
//   		colors: {
//   			'white-1': '#F8F8F8',
//   			'grey-1': '#616161',
//   			'grey-2': '#E5E7EB',
//   			'blue-1': '#005EBE',
//   			'blue-2': '#E9F5FE',
//   			'blue-3': '#F5F7F9',
//   			'red-1': '#FF0000',
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		},
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// };
// export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "heading1-bold": [
        "50px",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "heading2-bold": [
        "30px",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "heading3-bold": [
        "24px",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "heading4-bold": [
        "20px",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "body-bold": [
        "18px",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "body-semibold": [
        "18px",
        {
          lineHeight: "100%",
          fontWeight: "600",
        },
      ],
      "body-medium": [
        "18px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "base-bold": [
        "16px",
        {
          lineHeight: "100%",
          fontWeight: "600",
        },
      ],
      "base-medium": [
        "16px",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
    },
    extend: {
      colors: {
        "white-1": "#F8F8F8",
        "grey-1": "#616161",
        "grey-2": "#E5E7EB",
        "blue-1": "#005EBE",
        "blue-2": "#E9F5FE",
        "blue-3": "#F5F7F9",
        "red-1": "#FF0000",
      },
    },
  },
  plugins: [],
};
export default config;