const content = `
# MAIA 

Maia is an ongoing research project using chess as a case study for how to design better human-AI interactions. We hope Maia becomes a useful learning tool and is fun to play against. Our research goals include personalizing Maia to individual players, characterizing the kinds of mistakes that are made at each rating level, running Maia on your games and spotting repeated, predictable mistakes, and more.

We are going to be releasing beta versions of learning tools, teaching aids, and experiments based on Maia (analyses of your games, personalized puzzles, Turing tests, etc.). If you want to be the first to know, you can sign up for our email list [here](https://docs.google.com/forms/d/e/1FAIpQLScj95B7cnPLk9mxvOQKt__Ebav_5VaGTNAH8QY4RO8qjbrQSg/viewform).

If you want to see some more examples of Maia's predictions we have a tool [here](https://csslab.github.io/Maia-Agreement-Visualizer/) to see where the different models disagree.

# PAPER 

Read the full [research paper on Maia](https://arxiv.org/abs/2006.01855), which was published in the 2020 ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (KDD 2020).

You can read a blog post about Maia from the [Computational Social Science Lab](http://csslab.cs.toronto.edu/blog/2020/08/24/maia_chess_kdd/) or [Microsoft Research](https://www.microsoft.com/en-us/research/blog/the-human-side-of-ai-for-chess/).

#### ABSTRACT 

---

As artificial intelligence becomes increasingly intelligent--in some cases, achieving superhuman performance--there is growing potential for humans to learn from and collaborate with algorithms. However, the ways in which AI systems approach problems are often different from the ways people do, and thus may be uninterpretable and hard to learn from. A crucial step in bridging this gap between human and artificial intelligence is modeling the granular actions that constitute human behavior, rather than simply matching aggregate human performance. We pursue this goal in a model system with a long history in artificial intelligence: chess. The aggregate performance of a chess player unfolds as they make decisions over the course of a game. The hundreds of millions of games played online by players at every skill level form a rich source of data in which these decisions, and their exact context, are recorded in minute detail. Applying existing chess engines to this data, including an open-source implementation of AlphaZero, we find that they do not predict human moves well. We develop and introduce Maia, a customized version of Alpha-Zero trained on human chess games, that predicts human moves at a much higher accuracy than existing engines, and can achieve maximum accuracy when predicting decisions made by players at a specific skill level in a tuneable way. For a dual task of predicting whether a human will make a large mistake on the next move, we develop a deep neural network that significantly outperforms competitive baselines. Taken together, our results suggest that there is substantial promise in designing artificial intelligence systems with human collaboration in mind by first accurately modeling granular human decision-making.

## PLAY MAIA

You can play against Maia yourself on Lichess! You can play [Maia 1100](https://lichess.org/@/maia1), [Maia 1500](https://lichess.org/@/maia5), and [Maia 1900](https://lichess.org/@/maia9).

## DATA

All our data is from the wonderful archive at [database.lichess.org](https://database.lichess.org/). We converted the raw PGN raw data dumps into CSV, and have made the CSV we used for testing available at [csslab.cs.toronto.edu/datasets](http://csslab.cs.toronto.edu/datasets/#maia_kdd).

## ACKNOWLEDGMENTS

Many thanks to [Lichess.org](https://lichess.org/) for providing the human games that we trained on and hosting our Maia models that you can play against. Ashton Anderson was supported in part by an NSERC grant, a Microsoft Research gift, and a CFI grant. Jon Kleinberg was supported in part by a Simons Investigator Award, a Vannevar Bush Faculty Fellowship, a MURI grant, and a MacArthur Foundation grant.

`;

export default content;
