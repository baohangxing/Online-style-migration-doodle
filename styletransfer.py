import torch
import numpy as np
import matplotlib.pyplot as plt

# Make sure we all see the same
np.random.seed(456);
torch.manual_seed(456);

def makeit(pic,match,map):
    import style
    from style.utils import gallery, animate_progress
    bb = style.Backbone()
    st = style.IteratedStyleTransfer(bb)
    a_sem = \
        style.image.open('static/input/'+match) \
            .scale_long_to(256, resample=style.image.NEAREST)
    a = \
        style.image.open('static/input/'+pic) \
            .scale_long_to(256)

    seed_sem = \
        style.image.open('static/input/'+map) \
            .scale_to(a_sem.shape, resample=style.image.NEAREST)

    seed = \
        style.image.new_random_range(seed_sem.shape, 0.1, 1)

    sem_style = style.SemanticStyle(
        image=a,
        semantic_style_image=a_sem,
        semantic_content_image=seed_sem,
        layer_ids=[5, 9])

    g = st.generate_multiscale(
        content=style.Content(lambda_loss=0),
        style=sem_style,
        seed=seed,
        niter=50)

    # Below shows the reconstruction
    x = next(g)
    name ='static/output/changged_' +pic
    x.save(name)
    return name





