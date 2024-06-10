import { z } from 'zod';

const pokemonSchema = z.object({
  name: z.string().min(1).max(50),
  url: z.string().url(),
});

const validatePokemon = (data: object) => {
  return pokemonSchema.safeParse(data);
};

export { validatePokemon };
