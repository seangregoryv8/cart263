Project 1 – Bubble Game

https://yaxuanpang.github.io/cart263/topics/project1/

Going into this project, I initially assumed it would be fairly straightforward visually, but the more I interacted with it, the more I realized that a lot of the strength comes from how the code is structured to respond instantly to user input. It feels like one of those projects where the actual logic isn’t insanely complicated, but the way it’s implemented makes it feel much more alive than expected.

From what I could tell, this project is likely running on something like p5.js, using a continuous draw loop that updates every frame. That’s what allows everything to feel so responsive. Every small movement—especially mouse-based input—gets translated immediately into visual changes. That responsiveness is probably handled through variables that are constantly being updated and reused inside the loop, like tracking mouseX and mouseY values and feeding them directly into shapes or transformations.

One thing I found interesting is how much the project relies on mapping. Instead of hardcoding behavior, it feels like inputs are being scaled or translated into outputs, which is a really efficient way to make interactions feel smooth. It’s not just “if this then that,” but more like “take this input and continuously transform it,” which ends up feeling more natural.

The experience itself is pretty open-ended. There’s not really a strict goal, which I actually think works in its favor. It encourages you to just try things out and see what happens, almost like testing a system rather than completing a task. I found myself moving the mouse around just to see how far I could push certain effects, which is always a good sign that the interaction is engaging.

Another thing that stood out is how minimal the visuals are. There’s not a ton going on in terms of assets or complex graphics, but that actually makes the interaction clearer. You’re not distracted by unnecessary detail, so you can focus entirely on how your input affects the system.

Overall, I think what makes this project compelling is how it uses relatively basic programming concepts—loops, variables, and input handling—but applies them in a way that feels intentional. It’s a good example of how creative coding isn’t about how complex your code is, but how effectively you connect user input to visible output.

---

Project 2 – Mr. Sandman

https://lazer6769.github.io/Cart-263/Topics/Project_sand/

This one immediately stood out because it’s way more system-heavy than the others. Instead of just reacting to input, it’s actually simulating something, which makes it feel more like a mini-engine than just a visual project (it actually made my computer run incredibly slow at times).

The core of it is clearly a particle system, most likely built on a grid or array structure where each cell represents either empty space or a grain of sand. Each frame, the code probably loops through that grid and checks conditions like “can this particle move down?” or “is there space diagonally?” and then updates positions accordingly. It’s basically a bunch of conditional checks stacked together, but when you scale that up across a ton of particles, it creates something that looks surprisingly realistic.

What surprised me the most is how natural the movement feels. Even though it’s all rule-based, the addition of slight randomness (like choosing left or right when falling diagonally) makes it feel less robotic. That randomness is a small detail code-wise, but it has a huge impact on the overall effect.

I also started thinking about performance while using it, because running that many checks every frame can get expensive. So the code is probably optimized in some way—either by limiting updates, using efficient loops, or structuring the grid in a smart way. Otherwise it would slow down pretty quickly.

The experience itself is honestly kind of addictive. There’s no real objective, but dropping sand and watching it pile up is weirdly satisfying. It leans more into a sandbox style, where the fun comes from experimenting rather than progressing. I caught myself trying to “break” it or see how it behaves under different conditions, which is exactly what this kind of system encourages.

One thing I found really interesting is how simple rules can create complex behavior. Each particle only “knows” a few things—like gravity and collision—but together they create something that feels dynamic and almost organic.

Overall, this project is compelling because it focuses heavily on logic and structure. It’s less about visuals and more about how the system behaves, and it shows how far you can push basic conditionals and arrays when you apply them at scale.

---
Project 3 – Shadow Man Pet

https://lannacheck-ops.github.io/cart263/project-1/

This project feels a lot more structured compared to the others, almost like it’s trying to guide the user through something instead of just letting them experiment freely. It comes across as more design-focused, where the code is being used to control flow and presentation rather than simulate or react continuously.

From a coding perspective, it seems more event-driven. Instead of a constant draw loop doing everything, it likely relies on event listeners—things like clicks, hovers, or button presses—to trigger changes. That changes how the whole project feels, because interactions happen in steps rather than continuously.

There’s probably a decent amount of DOM manipulation going on here, especially if elements are appearing, disappearing, or changing state. That kind of structure requires keeping track of different elements and making sure everything updates correctly when the user interacts with it. It’s less about math or physics, and more about organization and flow.

What I found most interesting is how the project controls attention. It doesn’t just throw everything at you at once—it reveals things over time or based on interaction. That’s something that’s easy to overlook, but it makes a big difference in how the experience feels. The code is basically deciding what the user sees and when they see it.

The experience itself feels more intentional. Instead of experimenting randomly, I felt like I was moving through something that was designed ahead of time. That makes it less of a sandbox and more of a guided interaction, which isn’t worse—just different.

One surprising detail is how much small things matter here, like transitions or slight delays. Those are probably handled with simple timing functions or CSS/JS combinations, but they make the whole project feel more polished.

Overall, this project highlights a different side of creative coding. Instead of focusing on systems or simulations, it focuses on structure and user flow. The code is still important, but it’s being used more as a tool to shape the experience rather than drive complex behavior.