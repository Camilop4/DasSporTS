import  express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { collections } from "../db";
import New from "../models/newSports";

export const newsRouter = express.Router();

newsRouter.use(express.json());

newsRouter.get("/", async (_req: Request, res: Response) => {
  console.log('ruta get de Db');
  try {
    if (collections.news) {
      const documents = await collections.news.find({}).toArray();
      const news: New[] = documents.map(doc => {
        return {
          name: doc.name,
          description: doc.description,
          category: doc.category
        };
      });
      res.status(200).send(news);
    } else {
      res.status(500).send("La colección de noticias no está definida.");
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

newsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    if (!collections.news) {
      throw new Error("La colección de noticias no está definida");
    }

    const query = { _id: new ObjectId(id) };
    const news = await collections.news.findOne(query);

    if (news) {
      // Si se encontró la  noticia, la devolvemos
      res.status(200).send(news);
    } else {
      // Si no se encontró la noticia, enviamos un error 404
      res.status(404).send(`No se encontró ningún documento con el id: ${id}`);
    }
  } catch (error) {
    // Si ocurre un error, enviamos un error 500
    res.status(500).send(`Error al buscar el documento con el id: ${id}`);
  }

});

newsRouter.post("/", async (req: Request, res: Response) => {
  console.log('ruta de creacion de noticas');
  try {
    if (!collections.news) {
      throw new Error("La colección de noticias no está definida");
    }

    const newNotice = req.body as New;
    const result = await collections.news.insertOne(newNotice);

    if (result.insertedId) {
      res.status(201).send(`Se creó correctamente una nueva noticia con id ${result.insertedId}`);
    } else {
      res.status(500).send("Error al crear una nueva noticia.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send((error as Error).message);
  }
});

newsRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    if (!collections.news) {
      throw new Error("La colección de noticias no está definida");
    }

    const updatedNotice: New = req.body as New;
    const query = { _id: new ObjectId(id) };
    const result = await collections.news.updateOne(query, { $set: updatedNotice });

    if (result.modifiedCount > 0) {
      res.status(200).send(`Se actualizó correctamente la noticia con id ${id}`);
    } else {
      res.status(304).send(`La noticia con id: ${id} no se actualizó`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send((error as Error).message);
  }
});

newsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {

      if (!collections.news) {
        throw new Error("La colección de noticias no está definida");
      }

      const query = { _id: new ObjectId(id) };
      const result = await collections.news.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Successfully removed game with id ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove game with id ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Game with id ${id} does not exist`);
      }
  } catch (error) {
      console.error((error as Error).message);
      res.status(400).send((error as Error).message);
  }
});
