import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const projectSchema = z.array(
  z.object({
    name: z.string().optional().nullable(),
    html_url: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    homepage: z.string().optional().nullable(),
    language: z.string().optional().nullable(),
    stargazers_count: z.union([z.string(), z.number()]),
    forks_count: z.number(),
    private: z.boolean(),
  }),
);

export async function getGithubRepoData() {
  try {
    const url = new URL("https://api.github.com/users/sofrin/repos");
    url.searchParams.set("type", "owner");
    url.searchParams.set("sort", "pushed");
    url.searchParams.set("per_page", "10");
    const res = await fetch(url);
    const repos = projectSchema.parse(await res.json());
    return repos
      .filter((repo) => repo.private === false)
      .sort((a, b) => Number(b.stargazers_count) - Number(a.stargazers_count))
      .slice(0, 6)
      .map((repo) => ({
        repoUrl: repo.html_url,
        homePage: repo.homepage,
        description: repo.description,
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
      }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
