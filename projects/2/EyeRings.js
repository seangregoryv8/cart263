import { ranNum, QUARTER } from "./constants.js";

export class EyeRings
{
    constructor(mesh, maxSpeed = 0.15)
    {
        this.mesh = mesh;
        this.mesh.rotation.x = QUARTER;
        this.mesh.castShadow = true;
        this.maxSpeed = maxSpeed;
        this.increase = 0.004;
        this.accelerator = 0.001;
        this.increasing = true;
        this.burst = false;
        this.scheduleBurst();
    }
    changeSpeed()
    {
        if (!this.burst) return;
        if (this.increasing)
        {
            this.increase += this.accelerator;
            if (this.increase >= this.maxSpeed)
            {
                this.increase = this.maxSpeed;
                this.increasing = false;
            }
        }
        else
        {
            this.increase -= this.accelerator;
            if (this.increase <= 0.004)
            {
                this.increase = 0.004;
                this.increasing = true;
                this.burst = false;
                this.maxSpeed = ranNum(0.1, 0.2);
            }
        }
    }

    scheduleBurst()
    {
        setTimeout(() => {
            this.burst = true;
            this.scheduleBurst();
        }, ranNum(2000, 7000));
    }
}